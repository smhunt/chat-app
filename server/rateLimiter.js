// Simple token-bucket rate limiter factory for testing
export function createRateLimiter({ capacity = 20, refillPerSec = 5, costTyping = 0.2, costMessage = 1 } = {}) {
  return function allow(ctx, type) {
    const cost = type === 'typing' ? costTyping : costMessage
    const now = Date.now()
    if (!ctx._rl) ctx._rl = { tokens: capacity, last: now }
    const rl = ctx._rl
    const delta = (now - rl.last) / 1000
    rl.tokens = Math.min(capacity, rl.tokens + delta * refillPerSec)
    rl.last = now
    if (rl.tokens >= cost) {
      rl.tokens -= cost
      return true
    }
    return false
  }
}

// helper for tests: allow manual time control by injecting a custom Date.now
export function createTestableRateLimiter(opts) {
  const limiter = createRateLimiter(opts)
  return { limiter }
}
