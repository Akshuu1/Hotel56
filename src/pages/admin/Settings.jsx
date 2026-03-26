import { useState } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import AdminSidebar from '../../components/AdminSidebar'
import { hotelInfo } from '../../data/hotelData'
import './Admin.css'

export default function Settings() {
  const [saved, setSaved] = useState(false)
  const [hotel, setHotel] = useState({
    name: hotelInfo.name,
    tagline: hotelInfo.tagline,
    email: hotelInfo.email,
    phone1: hotelInfo.phone[0],
    phone2: hotelInfo.phone[1],
    address: hotelInfo.address,
    checkIn: '12:00',
    checkOut: '11:00',
    description: hotelInfo.description,
  })
  const [policies, setPolicies] = useState({
    cancellation: 'Free cancellation up to 48 hours before check-in. After that, one night\'s charge applies.',
    payment: 'Full payment required at the time of booking for online reservations. Walk-in guests can pay at check-out.',
    pets: 'Pets are not allowed on the property.',
    smoking: 'Smoking is strictly prohibited in all indoor areas. Designated smoking zones are available outdoors.',
  })

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-page-header">
          <div><h1>Settings</h1><p>Manage hotel information, policies, and website content.</p></div>
          <button className="btn btn-primary btn-sm" onClick={handleSave} id="settings-save"><Save size={16} /> Save All</button>
        </div>

        {saved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--secondary-container)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-6)', animation: 'fadeInUp 0.3s ease' }}>
            <CheckCircle size={18} color="var(--secondary)" />
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--secondary)' }}>Settings saved successfully!</span>
          </div>
        )}

        <div className="settings-grid">
          {/* Hotel Information */}
          <div className="settings-section" id="settings-hotel">
            <h3>Hotel Information</h3>
            <form className="settings-form">
              <div className="form-group"><label className="form-label">Hotel Name</label><input type="text" className="form-input" value={hotel.name} onChange={e => setHotel(p => ({ ...p, name: e.target.value }))} id="settings-name" /></div>
              <div className="form-group"><label className="form-label">Tagline</label><input type="text" className="form-input" value={hotel.tagline} onChange={e => setHotel(p => ({ ...p, tagline: e.target.value }))} id="settings-tagline" /></div>
              <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-input" value={hotel.email} onChange={e => setHotel(p => ({ ...p, email: e.target.value }))} id="settings-email" /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Phone 1</label><input type="tel" className="form-input" value={hotel.phone1} onChange={e => setHotel(p => ({ ...p, phone1: e.target.value }))} id="settings-phone1" /></div>
                <div className="form-group"><label className="form-label">Phone 2</label><input type="tel" className="form-input" value={hotel.phone2} onChange={e => setHotel(p => ({ ...p, phone2: e.target.value }))} id="settings-phone2" /></div>
              </div>
              <div className="form-group"><label className="form-label">Address</label><input type="text" className="form-input" value={hotel.address} onChange={e => setHotel(p => ({ ...p, address: e.target.value }))} id="settings-address" /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Check-in Time</label><input type="time" className="form-input" value={hotel.checkIn} onChange={e => setHotel(p => ({ ...p, checkIn: e.target.value }))} id="settings-checkin" /></div>
                <div className="form-group"><label className="form-label">Check-out Time</label><input type="time" className="form-input" value={hotel.checkOut} onChange={e => setHotel(p => ({ ...p, checkOut: e.target.value }))} id="settings-checkout" /></div>
              </div>
              <div className="form-group"><label className="form-label">Description</label><textarea className="form-input form-textarea" rows="4" value={hotel.description} onChange={e => setHotel(p => ({ ...p, description: e.target.value }))} id="settings-desc" /></div>
            </form>
          </div>

          {/* Policies */}
          <div className="settings-section" id="settings-policies">
            <h3>Hotel Policies</h3>
            <form className="settings-form">
              <div className="form-group"><label className="form-label">Cancellation Policy</label><textarea className="form-input form-textarea" rows="3" value={policies.cancellation} onChange={e => setPolicies(p => ({ ...p, cancellation: e.target.value }))} id="settings-cancellation" /></div>
              <div className="form-group"><label className="form-label">Payment Policy</label><textarea className="form-input form-textarea" rows="3" value={policies.payment} onChange={e => setPolicies(p => ({ ...p, payment: e.target.value }))} id="settings-payment-policy" /></div>
              <div className="form-group"><label className="form-label">Pet Policy</label><textarea className="form-input form-textarea" rows="2" value={policies.pets} onChange={e => setPolicies(p => ({ ...p, pets: e.target.value }))} id="settings-pets" /></div>
              <div className="form-group"><label className="form-label">Smoking Policy</label><textarea className="form-input form-textarea" rows="2" value={policies.smoking} onChange={e => setPolicies(p => ({ ...p, smoking: e.target.value }))} id="settings-smoking" /></div>
            </form>
          </div>

          {/* SEO Settings */}
          <div className="settings-section" id="settings-seo">
            <h3>SEO Settings</h3>
            <form className="settings-form">
              <div className="form-group"><label className="form-label">Meta Title</label><input type="text" className="form-input" defaultValue="Hotel Shimla Regency | Budget Hotel in Shimla with Mountain Views" id="settings-meta-title" /></div>
              <div className="form-group"><label className="form-label">Meta Description</label><textarea className="form-input form-textarea" rows="3" defaultValue="Book your stay at Hotel Shimla Regency in Dudhli, Shimla. Enjoy mountain views, comfortable rooms from ₹800/night, and warm Himalayan hospitality." id="settings-meta-desc" /></div>
              <div className="form-group"><label className="form-label">Keywords</label><input type="text" className="form-input" defaultValue="Hotel Shimla, Shimla Regency, budget hotel Shimla, mountain hotel, Dudhli Shimla" id="settings-keywords" /></div>
            </form>
          </div>

          {/* Social Media */}
          <div className="settings-section" id="settings-social">
            <h3>Social Media Links</h3>
            <form className="settings-form">
              <div className="form-group"><label className="form-label">Instagram</label><input type="url" className="form-input" placeholder="https://instagram.com/..." id="settings-instagram" /></div>
              <div className="form-group"><label className="form-label">Facebook</label><input type="url" className="form-input" placeholder="https://facebook.com/..." id="settings-facebook" /></div>
              <div className="form-group"><label className="form-label">Twitter / X</label><input type="url" className="form-input" placeholder="https://x.com/..." id="settings-twitter" /></div>
              <div className="form-group"><label className="form-label">YouTube</label><input type="url" className="form-input" placeholder="https://youtube.com/..." id="settings-youtube" /></div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
