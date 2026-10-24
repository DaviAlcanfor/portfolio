/// <reference types="youtube" />

interface Window {
  /** chamado pela YouTube IFrame API quando termina de carregar */
  onYouTubeIframeAPIReady?: () => void
}
