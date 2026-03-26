import './LoadingScreen.css'

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-mountain">
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 30L90 70L120 20L160 80L200 40V120H0Z" fill="var(--sage-green)" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/>
          </path>
          <path d="M0 120L80 50L110 80L150 30L200 70V120H0Z" fill="var(--sage-green)" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" begin="0.3s"/>
          </path>
        </svg>
      </div>
      <p className="loading-text">Hotel Shimla Regency</p>
      <div className="loading-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  )
}
