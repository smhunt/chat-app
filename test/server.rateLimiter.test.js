import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createRateLimiter } from '../server/rateLimiter.js'

describe('rateLimiter', () => {
  it('consumes tokens for messages and prevents overuse', () => {
    const allow = createRateLimiter({ capacity: 3, refillPerSec: 0, costMessage: 1 })
    const ctx = {}
    assert(allow(ctx, 'message') === true)
    assert(allow(ctx, 'message') === true)
    assert(allow(ctx, 'message') === true)
    // now exhausted
    assert(allow(ctx, 'message') === false)
  })

  it('refills tokens over time', (t) => {
    const allow = createRateLimiter({ capacity: 2, refillPerSec: 2, costMessage: 1 })
    const ctx = {}
    assert(allow(ctx, 'message') === true)
    assert(allow(ctx, 'message') === true)
    // now empty; simulate 500ms -> should refill by 1 token
    const orig = Date.now
    let fakeNow = Date.now()
    Date.now = () => fakeNow
    try {
      fakeNow += 500
      // allow should succeed once
      assert(allow(ctx, 'message') === true)
    } finally {
      Date.now = orig
    }
  })

  it('typing has lower cost', () => {
    const allow = createRateLimiter({ capacity: 1, refillPerSec: 0, costTyping: 0.25, costMessage: 1 })
    const ctx = {}
    // many typing events should be allowed until tokens run out
    assert(allow(ctx, 'typing') === true)
    assert(allow(ctx, 'typing') === true)
    assert(allow(ctx, 'typing') === true)
    // after ~4 typing events (0.25 each) capacity=1 -> should be exhausted
  })
})
