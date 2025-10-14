export const api = {
  async health() {
    const res = await fetch('http://localhost:3001/health').catch(() => null)
    return res?.ok ? res.text() : 'offline'
  }
}
