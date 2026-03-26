import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { chatbotResponses } from '../data/hotelData'
import './Chatbot.css'

const quickActions = [
  { label: '🏨 Rooms & Pricing', key: 'rooms' },
  { label: '📅 Book a Room', key: 'booking' },
  { label: '📍 Location', key: 'location' },
  { label: '🍽️ Food & Dining', key: 'food' },
  { label: '⏰ Check-in/out', key: 'checkin' },
  { label: '🏔️ Nearby Places', key: 'nearby' },
]

function detectIntent(msg) {
  const lower = msg.toLowerCase()
  if (/room|price|cost|rate|tariff|type|suite|deluxe|standard|family/i.test(lower)) return 'rooms'
  if (/book|reserv|availability|available/i.test(lower)) return 'booking'
  if (/locat|address|direction|where|map|reach|how to get/i.test(lower)) return 'location'
  if (/ameni|facilit|service|offer|provide|feature/i.test(lower)) return 'amenities'
  if (/check.?in|check.?out|time|when/i.test(lower)) return 'checkin'
  if (/food|restaurant|breakfast|lunch|dinner|eat|dining|menu/i.test(lower)) return 'food'
  if (/near|attract|visit|place|sight|tour|thing/i.test(lower)) return 'nearby'
  if (/pay|card|upi|cash|refund|cancel/i.test(lower)) return 'payment'
  if (/hi|hello|hey|namaste|good morning|good evening/i.test(lower)) return 'greeting'
  return 'default'
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: chatbotResponses.greeting }
  ])
  const [input, setInput] = useState('')
  const messagesEnd = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text) => {
    if (!text.trim()) return
    const userMsg = { type: 'user', text: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    setTimeout(() => {
      const intent = detectIntent(text)
      let response = chatbotResponses[intent]

      if (intent === 'booking') {
        response += '\n\n_Click below to go to booking:_'
      }

      setMessages(prev => [...prev, { type: 'bot', text: response, intent }])
    }, 600)
  }

  const handleQuickAction = (key) => {
    const labels = { rooms: 'Tell me about rooms', booking: 'I want to book a room', location: 'Where is the hotel?', food: 'What food do you serve?', checkin: 'What are check-in times?', nearby: 'What places are nearby?' }
    sendMessage(labels[key] || key)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      <button
        className={`chatbot-fab ${isOpen ? 'chatbot-fab-hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        id="chatbot-open"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
        <span className="chatbot-fab-label">Need Help?</span>
      </button>

      <div className={`chatbot-panel ${isOpen ? 'chatbot-panel-open' : ''}`} id="chatbot-panel">
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <Bot size={20} />
            </div>
            <div>
              <h4>Shimla Regency AI</h4>
              <span className="chatbot-status">● Online</span>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)} id="chatbot-close" aria-label="Close chat">
            <X size={20} />
          </button>
        </div>

        <div className="chatbot-messages" id="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message chat-${msg.type}`}>
              <div className="chat-icon">
                {msg.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className="chat-bubble">
                {msg.text.split('\n').map((line, j) => (
                  <span key={j}>
                    {line.replace(/\*\*(.*?)\*\*/g, '«$1»').split('«').map((part, k) => {
                      if (part.includes('»')) {
                        const [bold, rest] = part.split('»')
                        return <span key={k}><strong>{bold}</strong>{rest}</span>
                      }
                      return part
                    })}
                    {j < msg.text.split('\n').length - 1 && <br />}
                  </span>
                ))}
                {msg.intent === 'booking' && (
                  <button className="chat-action-btn" onClick={() => { navigate('/booking'); setIsOpen(false) }}>
                    Go to Booking →
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEnd} />
        </div>

        <div className="chatbot-quick-actions">
          {quickActions.map(action => (
            <button
              key={action.key}
              className="quick-action-chip"
              onClick={() => handleQuickAction(action.key)}
              id={`quick-${action.key}`}
            >
              {action.label}
            </button>
          ))}
        </div>

        <form className="chatbot-input" onSubmit={handleSubmit} id="chatbot-form">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me anything about the hotel..."
            className="form-input chatbot-text-input"
            id="chatbot-input"
          />
          <button type="submit" className="chatbot-send" id="chatbot-send" aria-label="Send">
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  )
}
