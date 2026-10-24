// Efeito glitch: cada letra embaralha e "trava" no caractere certo, da esquerda pra direita.

export const GLYPHS = '!#$%*+=?/\\|_-01ABCDEFGHIJKLMNOPQRSTUVWXYZ@'
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const running = new WeakMap<HTMLElement, number>() // cancela animação anterior no mesmo elemento
const finalText = new WeakMap<HTMLElement, string>() // texto "de verdade", mesmo no meio de uma animação

export function scramble(el: HTMLElement, text: string, duration = 900): void {
  finalText.set(el, text)
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

/** Glitch ao passar o mouse em qualquer elemento com o atributo `data-glitch`. */
export function glitchOnHover(): void {
  for (const el of document.querySelectorAll<HTMLElement>('[data-glitch]')) {
    el.addEventListener('mouseenter', (e) => {
      // não atrapalha quem está selecionando texto (o glitch reescreve o conteúdo)
      if (e.buttons || !getSelection()?.isCollapsed) return
      const text = finalText.get(el) ?? el.textContent ?? ''
      if (text) scramble(el, text, 500)
    })
  }
}
