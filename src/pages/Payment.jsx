import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CheckCircle, CreditCard, Smartphone, Building2, Wallet, Shield, ArrowLeft } from 'lucide-react'
import './Payment.css'

export default function Payment() {
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvv: '', holder: '' })

  useEffect(() => {
    const data = sessionStorage.getItem('booking')
    if (data) {
      setBooking(JSON.parse(data))
    } else {
      navigate('/booking')
    }
  }, [navigate])

  const handlePayment = (e) => {
    e.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setSuccess(true)
      sessionStorage.removeItem('booking')
    }, 2500)
  }

  if (!booking) return null

  if (success) {
    const bookingId = 'HSR' + Date.now().toString(36).toUpperCase()
    return (
      <main className="page-wrapper">
        <section className="payment-success section-padding">
          <div className="container success-container">
            <div className="success-card">
              <div className="success-icon">
                <CheckCircle size={64} />
              </div>
              <h1>Booking Confirmed!</h1>
              <p className="success-message">Your reservation at Hotel Shimla Regency has been confirmed.</p>
              <div className="success-details">
                <div className="success-row"><span>Booking ID</span><strong>{bookingId}</strong></div>
                <div className="success-row"><span>Room</span><strong>{booking.room.name}</strong></div>
                <div className="success-row"><span>Check-in</span><strong>{new Date(booking.checkIn).toLocaleDateString('en-IN')}</strong></div>
                <div className="success-row"><span>Check-out</span><strong>{new Date(booking.checkOut).toLocaleDateString('en-IN')}</strong></div>
                <div className="success-row"><span>Nights</span><strong>{booking.nights}</strong></div>
                <div className="success-row"><span>Guest</span><strong>{booking.name}</strong></div>
                <div className="success-row success-total"><span>Amount Paid</span><strong>₹{booking.total.toLocaleString()}</strong></div>
              </div>
              <p className="success-email">A confirmation email has been sent to <strong>{booking.email}</strong></p>
              <div className="success-actions">
                <Link to="/" className="btn btn-primary" id="success-home">Back to Home</Link>
                <button className="btn btn-secondary" onClick={() => window.print()} id="success-print">Print Receipt</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page-wrapper">
      <section className="payment-hero">
        <div className="container">
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/booking')} id="payment-back">
            <ArrowLeft size={16} /> Back to Booking
          </button>
          <h1>Complete Payment</h1>
          <p>Secure payment powered by Razorpay</p>
        </div>
      </section>

      <section className="payment-main section-padding">
        <div className="container">
          <div className="payment-layout">
            {/* Payment Form */}
            <div className="payment-form-area">
              <div className="payment-methods">
                <h3>Payment Method</h3>
                <div className="method-options">
                  {[
                    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                    { id: 'upi', label: 'UPI', icon: Smartphone },
                    { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                    { id: 'wallet', label: 'Wallet', icon: Wallet },
                  ].map(m => (
                    <label key={m.id} className={`method-option ${paymentMethod === m.id ? 'method-active' : ''}`} id={`method-${m.id}`}>
                      <input type="radio" name="method" value={m.id} checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} />
                      <m.icon size={20} />
                      <span>{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <form onSubmit={handlePayment} className="payment-form" id="payment-form">
                {paymentMethod === 'card' && (
                  <div className="card-form">
                    <div className="form-group">
                      <label className="form-label">Card Number</label>
                      <input type="text" className="form-input" placeholder="1234 5678 9012 3456" maxLength="19" value={cardForm.number} onChange={e => setCardForm(p => ({ ...p, number: e.target.value }))} id="card-number" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Card Holder Name</label>
                      <input type="text" className="form-input" placeholder="Name on card" value={cardForm.holder} onChange={e => setCardForm(p => ({ ...p, holder: e.target.value }))} id="card-holder" required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Expiry</label>
                        <input type="text" className="form-input" placeholder="MM/YY" maxLength="5" value={cardForm.expiry} onChange={e => setCardForm(p => ({ ...p, expiry: e.target.value }))} id="card-expiry" required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVV</label>
                        <input type="password" className="form-input" placeholder="•••" maxLength="3" value={cardForm.cvv} onChange={e => setCardForm(p => ({ ...p, cvv: e.target.value }))} id="card-cvv" required />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="form-group">
                    <label className="form-label">UPI ID</label>
                    <input type="text" className="form-input" placeholder="yourname@upi" id="upi-id" required />
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="form-group">
                    <label className="form-label">Select Bank</label>
                    <select className="form-input" id="bank-select" required>
                      <option value="">Choose your bank</option>
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Punjab National Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="wallet-options">
                    {['Paytm', 'PhonePe', 'Amazon Pay', 'Freecharge'].map(w => (
                      <label key={w} className="wallet-option" id={`wallet-${w.toLowerCase().replace(' ', '')}`}>
                        <input type="radio" name="wallet" value={w} required />
                        <span>{w}</span>
                      </label>
                    ))}
                  </div>
                )}

                <div className="payment-security">
                  <Shield size={16} />
                  <span>Your payment is secured with 256-bit SSL encryption</span>
                </div>

                <button type="submit" className={`btn btn-primary btn-lg payment-submit ${processing ? 'payment-processing' : ''}`} disabled={processing} id="pay-now">
                  {processing ? (
                    <><span className="spinner" /> Processing Payment...</>
                  ) : (
                    <>Pay ₹{booking.total.toLocaleString()}</>
                  )}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <aside className="payment-summary">
              <div className="sidebar-card">
                <h4>Order Summary</h4>
                <div className="sidebar-room">
                  <img src={booking.room.image} alt={booking.room.name} />
                  <div>
                    <strong>{booking.room.name}</strong>
                    <span>{booking.room.size}</span>
                  </div>
                </div>
                <div className="sidebar-pricing">
                  <div className="sidebar-row"><span>Check-in</span><span>{new Date(booking.checkIn).toLocaleDateString('en-IN')}</span></div>
                  <div className="sidebar-row"><span>Check-out</span><span>{new Date(booking.checkOut).toLocaleDateString('en-IN')}</span></div>
                  <div className="sidebar-row"><span>{booking.nights} night{booking.nights > 1 ? 's' : ''} × ₹{booking.room.price.toLocaleString()}</span><span>₹{(booking.room.price * booking.nights).toLocaleString()}</span></div>
                  <div className="sidebar-row"><span>GST (12%)</span><span>₹{Math.round(booking.room.price * booking.nights * 0.12).toLocaleString()}</span></div>
                  <div className="sidebar-row sidebar-total"><span>Total</span><span>₹{booking.total.toLocaleString()}</span></div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
