import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { hotelInfo } from '../data/hotelData'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <main className="page-wrapper">
      <section className="contact-hero">
        <div className="contact-hero-bg">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80" alt="Contact" />
          <div className="contact-hero-overlay" />
        </div>
        <div className="container contact-hero-content">
          <span className="section-label" style={{ color: 'var(--primary-container)' }}>Get in Touch</span>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out for bookings, inquiries, or feedback.</p>
        </div>
      </section>

      <section className="contact-main section-padding">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info Cards */}
            <div className="contact-info">
              <div className="contact-card" id="contact-address">
                <div className="contact-card-icon"><MapPin size={22} /></div>
                <h4>Address</h4>
                <p>{hotelInfo.address}</p>
              </div>
              <div className="contact-card" id="contact-phone">
                <div className="contact-card-icon"><Phone size={22} /></div>
                <h4>Phone</h4>
                <p><a href={`tel:${hotelInfo.phone[0]}`}>{hotelInfo.phone[0]}</a></p>
                <p><a href={`tel:${hotelInfo.phone[1]}`}>{hotelInfo.phone[1]}</a></p>
              </div>
              <div className="contact-card" id="contact-email">
                <div className="contact-card-icon"><Mail size={22} /></div>
                <h4>Email</h4>
                <p><a href={`mailto:${hotelInfo.email}`}>{hotelInfo.email}</a></p>
              </div>
              <div className="contact-card" id="contact-hours">
                <div className="contact-card-icon"><Clock size={22} /></div>
                <h4>Front Desk Hours</h4>
                <p>24 hours, 7 days a week</p>
                <p>Check-in: {hotelInfo.checkIn} | Check-out: {hotelInfo.checkOut}</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-area">
              <h2>Send Us a Message</h2>
              <p className="contact-form-subtitle">Fill out the form and our team will get back to you within 24 hours.</p>

              {sent && (
                <div className="contact-success" id="contact-success">
                  <CheckCircle size={20} />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form" id="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" placeholder="Your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required id="contact-name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required id="contact-email-input" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" placeholder="+91-XXXXXXXXXX" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} id="contact-phone-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select className="form-input" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} required id="contact-subject">
                      <option value="">Select subject</option>
                      <option>Room Inquiry</option>
                      <option>Booking Help</option>
                      <option>Group Booking</option>
                      <option>Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input form-textarea" rows="5" placeholder="Tell us how we can help..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required id="contact-message" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" id="contact-submit">
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="contact-map" id="contact-map">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3417.42!2d${hotelInfo.coordinates.lng}!3d${hotelInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHotel+Shimla+Regency!5e0!3m2!1sen!2sin!4v1`}
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
              allowFullScreen
              loading="lazy"
              title="Hotel Shimla Regency Location"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
