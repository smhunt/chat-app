import { useEffect, useRef, useState } from 'react'

export default function useWebSocket({ url, conversationId, onTyping }) {
  const wsRef = useRef(null)
  // queue messages while socket is CONNECTING
  const sendQueueRef = useRef([])
  const reconnectTimerRef = useRef(null)
  const shouldReconnectRef = useRef(true)
  const connectAttemptsRef = useRef(0)
  const connectingRef = useRef(false)
  const [messages, setMessages] = useState([])
  const [typingUsers, setTypingUsers] = useState([])
  const [status, setStatus] = useState('connecting') // 'connecting' | 'open' | 'closed' | 'error'

  // keep handler in ref so it doesn't trigger effect re-runs
  const onTypingRef = useRef(onTyping)
  useEffect(() => { onTypingRef.current = onTyping }, [onTyping])

  useEffect(() => {
    shouldReconnectRef.current = true

    const connect = () => {
      // avoid parallel connect attempts
      if (connectingRef.current) return
      // if there's already an open socket, don't open another
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return

      connectingRef.current = true
      setStatus('connecting')
      const ws = new WebSocket(url)
      wsRef.current = ws

      const flushQueue = () => {
        const q = sendQueueRef.current
        while (q.length && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          const data = q.shift()
          try {
            wsRef.current.send(data)
          } catch (e) {
            console.debug('failed to send queued message', e)
            q.unshift(data)
            break
          }
        }
      }

      ws.onopen = () => {
        connectingRef.current = false
        connectAttemptsRef.current = 0
        setStatus('open')
        try {
          ws.send(JSON.stringify({ type: 'join', conversationId }))
        } catch (e) {
          console.error('failed to send join', e)
        }
        flushQueue()
      }

      ws.onmessage = (ev) => {
        let msg
        try {
          msg = JSON.parse(ev.data)
        } catch (e) {
          console.debug('invalid message from server', e)
          return
        }
        if (msg.type === 'message') {
          setMessages(m => [...m, msg.payload])
        } else if (msg.type === 'history') {
          setMessages(msg.payload || [])
        } else if (msg.type === 'typing') {
          setTypingUsers(msg.payload || [])
          try { onTypingRef.current?.(msg.payload || []) } catch (e) { console.debug('onTyping handler error', e) }
        }
      }

      ws.onerror = (ev) => {
        // log error but let onclose trigger reconnect/backoff
        console.debug('websocket error', ev)
        setStatus('error')
      }

      ws.onclose = () => {
        connectingRef.current = false
        if (wsRef.current === ws) wsRef.current = null
        setStatus('closed')
        // schedule reconnect unless unmounted
        if (shouldReconnectRef.current) {
          // exponential backoff with jitter
          connectAttemptsRef.current = Math.min((connectAttemptsRef.current || 0) + 1, 30)
          const base = 1000 // 1s
          const maxDelay = 30000 // 30s
          // exponential backoff: base * 2^(attempts-1)
          const exp = Math.min(maxDelay, base * Math.pow(2, connectAttemptsRef.current - 1))
          // add jitter up to 30%
          const jitter = Math.floor(Math.random() * (exp * 0.3))
          const delay = Math.min(maxDelay, exp + jitter)
          reconnectTimerRef.current = setTimeout(() => connect(), delay)
        }
      }
    }

    connect()

    return () => {
      shouldReconnectRef.current = false
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current)
      const ws = wsRef.current
      try { ws?.close() } catch (e) {}
      wsRef.current = null
    }
  }, [url, conversationId])

  const sendOrQueue = (str) => {
    const ws = wsRef.current
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(str)
    } else {
      const q = sendQueueRef.current
      q.push(str)
      // cap queue to 100 messages; drop oldest when exceeded
      if (q.length > 100) q.shift()
    }
  }

  const sendMessage = (payload) => {
    sendOrQueue(JSON.stringify({ type: 'message', payload }))
  }
  const sendTyping = (author) => {
    sendOrQueue(JSON.stringify({ type: 'typing', payload: { author, conversationId } }))
  }

  return { messages, sendMessage, sendTyping, status }
}
