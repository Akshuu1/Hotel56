import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Users, CreditCard, ArrowRight, Check } from 'lucide-react'
import { rooms, hotelInfo } from '../data/hotelData'
import './Booking.css'

export default function Booking() {
  const { roomType } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    roomId: roomType || '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  })
  const [nights, setNights] = useState(0)

  useEffect(() => {
    if (form.checkIn && form.checkOut) {
      const d1 = new Date(form.checkIn)
      const d2 = new Date(form.checkOut)
      const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24))
      setNights(diff > 0 ? diff : 0)
    }
  }, [form.checkIn, form.checkOut])

  const selectedRoom = rooms.find(r => r.id === form.roomId)
  const total = selectedRoom ? selectedRoom.price * nights : 0
  const tax = Math.round(total * 0.12)
  const grandTotal = total + tax

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const canProceed = () => {
    if (step === 1) return form.roomId && form.checkIn && form.checkOut && nights > 0
    if (step === 2) return form.name && form.email && form.phone
    return true
  }

  const handleProceedToPayment = () => {
    const bookingData = { ...form, nights, total: grandTotal, room: selectedRoom }
    sessionStorage.setItem('booking', JSON.stringify(bookingData))
    navigate('/payment')
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <main className="page-wrapper">
      <section className="booking-hero">
        <div className="container">
          <h1>Book Your Stay</h1>
          <p>Complete your reservation in just a few steps.</p>
        </div>
      </section>

      <section className="booking-main section-padding">
        <div className="container">
          {/* Progress Steps */}
          <div className="booking-steps">
            {[{ num: 1, label: 'Room & Dates', icon: Calendar }, { num: 2, label: 'Guest Info', icon: Users }, { num: 3, label: 'Review & Pay', icon: CreditCard }].map(s => (
              <div key={s.num} className={`booking-step ${step >= s.num ? 'step-active' : ''} ${step > s.num ? 'step-completed' : ''}`}>
                <div className="step-circle">
                  {step > s.num ? <Check size={16} /> : s.num}
                </div>
                <span className="step-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="booking-layout">
            <div className="booking-form-area">
              {/* Step 1 */}
              {step === 1 && (
                <div className="booking-step-content animate-fadeIn" id="step-1">
                  <h2>Select Room & Dates</h2>

                  <div className="room-selection">
                    <label className="form-label">Choose Room Type</label>
                    <div className="room-options">
                      {rooms.map(room => (
                        <label key={room.id} className={`room-option ${form.roomId === room.id ? 'room-option-selected' : ''}`} id={`select-${room.id}`}>
                          <input
                            type="radio"
                            name="roomType"
                            value={room.id}
                            checked={form.roomId === room.id}
                            onChange={e => updateForm('roomId', e.target.value)}
                          />
                          <img src={room.image} alt={room.name} />
                          <div className="room-option-info">
                            <strong>{room.name}</strong>
                            <span>{room.size} • {room.bed}</span>
                            <span className="room-option-price">₹{room.price.toLocaleString()}/night</span>
                          </div>
                          <div className="room-option-check">
                            <Check size={16} />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="dates-row">
                    <div className="form-group">
                      <label className="form-label">Check-in Date</label>
                      <input type="date" className="form-input" value={form.checkIn} min={today} onChange={e => updateForm('checkIn', e.target.value)} id="booking-checkin" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Check-out Date</label>
                      <input type="date" className="form-input" value={form.checkOut} min={form.checkIn || today} onChange={e => updateForm('checkOut', e.target.value)} id="booking-checkout" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Guests</label>
                      <select className="form-input" value={form.guests} onChange={e => updateForm('guests', +e.target.value)} id="booking-guests">
                        {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="booking-step-content animate-fadeIn" id="step-2">
                  <h2>Guest Information</h2>
                  <div className="guest-form">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-input" placeholder="Enter your full name" value={form.name} onChange={e => updateForm('name', e.target.value)} id="guest-name" />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={e => updateForm('email', e.target.value)} id="guest-email" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input type="tel" className="form-input" placeholder="+91-XXXXXXXXXX" value={form.phone} onChange={e => updateForm('phone', e.target.value)} id="guest-phone" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Special Requests (Optional)</label>
                      <textarea className="form-input form-textarea" placeholder="Any special requirements..." rows="3" value={form.specialRequests} onChange={e => updateForm('specialRequests', e.target.value)} id="guest-requests" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="booking-step-content animate-fadeIn" id="step-3">
                  <h2>Review Your Booking</h2>
                  <div className="review-card">
                    <div className="review-room">
                      {selectedRoom && <img src={selectedRoom.image} alt={selectedRoom.name} />}
                      <div>
                        <h3>{selectedRoom?.name}</h3>
                        <p>{selectedRoom?.size} • {selectedRoom?.bed} • {form.guests} Guest{form.guests > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="review-details">
                      <div className="review-row"><span>Check-in</span><strong>{new Date(form.checkIn).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong></div>
                      <div className="review-row"><span>Check-out</span><strong>{new Date(form.checkOut).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong></div>
                      <div className="review-row"><span>Guest</span><strong>{form.name}</strong></div>
                      <div className="review-row"><span>Email</span><strong>{form.email}</strong></div>
                      <div className="review-row"><span>Phone</span><strong>{form.phone}</strong></div>
                      {form.specialRequests && <div className="review-row"><span>Requests</span><strong>{form.specialRequests}</strong></div>}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="booking-nav">
                {step > 1 && <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)} id="booking-back">Back</button>}
                {step < 3 && (
                  <button className="btn btn-primary" disabled={!canProceed()} onClick={() => setStep(s => s + 1)} id="booking-next">
                    Continue <ArrowRight size={16} />
                  </button>
                )}
                {step === 3 && (
                  <button className="btn btn-primary btn-lg" onClick={handleProceedToPayment} id="booking-pay">
                    Proceed to Payment — ₹{grandTotal.toLocaleString()} <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar Summary */}
            <aside className="booking-sidebar">
              <div className="sidebar-card">
                <h4>Booking Summary</h4>
                {selectedRoom ? (
                  <>
                    <div className="sidebar-room">
                      <img src={selectedRoom.image} alt={selectedRoom.name} />
                      <div>
                        <strong>{selectedRoom.name}</strong>
                        <span>₹{selectedRoom.price.toLocaleString()}/night</span>
                      </div>
                    </div>
                    {nights > 0 && (
                      <div className="sidebar-pricing">
                        <div className="sidebar-row"><span>₹{selectedRoom.price.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span><span>₹{total.toLocaleString()}</span></div>
                        <div className="sidebar-row"><span>Taxes (12% GST)</span><span>₹{tax.toLocaleString()}</span></div>
                        <div className="sidebar-row sidebar-total"><span>Total</span><span>₹{grandTotal.toLocaleString()}</span></div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="sidebar-empty">Select a room to see pricing</p>
                )}
              </div>
              <div className="sidebar-info">
                <p>✓ Free cancellation up to 48 hours</p>
                <p>✓ Best price guaranteed</p>
                <p>✓ Instant confirmation</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
