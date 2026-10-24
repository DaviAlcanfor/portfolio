// Efeito glitch: cada letra embaralha e "trava" no caractere certo, da esquerda pra direita.

const GLYPHS = '!#$%*+=?/\\|_-01ABCDEFGHIJKLMNOPQRSTUVWXYZ@'
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const running = new WeakMap<HTMLElement, number>() // cancela animação anterior no mesmo elemento

export function scramble(el: HTMLElement, text: string, duration = 900): void {
  if (reduced) {
    el.textContent = text
    return
  }
  const id = (running.get(el) ?? 0) + 1
  running.set(el, id)

  const lockAt = [...text].map((_, i) => (i / text.length) * duration * 0.6 + Math.random() * duration * 0.4)
  const start = performance.now()

  const frame = (now: number) => {
    if (running.get(el) !== id) return
    const t = now - start
    let html = ''
    for (let i = 0; i < text.length; i++) {
      const c = text[i]
      if (t >= lockAt[i] || c === ' ' || c === '\n') html += c === '&' ? '&amp;' : c === '<' ? '&lt;' : c
      else html += `<span class="scr">${GLYPHS[(Math.random() * GLYPHS.length) | 0]}</span>`
    }
    el.innerHTML = html
    if (t < duration) requestAnimationFrame(frame)
    else el.textContent = text
  }
  requestAnimationFrame(frame)
}
