import { useState } from 'react'
import { Search, Filter, Eye, CheckCircle, XCircle } from 'lucide-react'
import AdminSidebar from '../../components/AdminSidebar'
import './Admin.css'

const allBookings = [
  { id: 'HSR001', guest: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '+91-9876543210', room: 'Deluxe Room', checkIn: '2026-03-28', checkOut: '2026-03-30', guests: 2, amount: 2688, status: 'Confirmed', createdAt: '2026-03-25' },
  { id: 'HSR002', guest: 'Priya Sharma', email: 'priya@email.com', phone: '+91-9876543211', room: 'Family Suite', checkIn: '2026-03-27', checkOut: '2026-03-29', guests: 4, amount: 4480, status: 'Confirmed', createdAt: '2026-03-24' },
  { id: 'HSR003', guest: 'Amit Patel', email: 'amit@email.com', phone: '+91-9876543212', room: 'Standard Room', checkIn: '2026-03-29', checkOut: '2026-03-31', guests: 1, amount: 1792, status: 'Pending', createdAt: '2026-03-26' },
  { id: 'HSR004', guest: 'Sneha Kapoor', email: 'sneha@email.com', phone: '+91-9876543213', room: 'Super Deluxe', checkIn: '2026-03-30', checkOut: '2026-04-02', guests: 2, amount: 5376, status: 'Confirmed', createdAt: '2026-03-25' },
  { id: 'HSR005', guest: 'Vikram Singh', email: 'vikram@email.com', phone: '+91-9876543214', room: 'Deluxe Room', checkIn: '2026-04-01', checkOut: '2026-04-03', guests: 2, amount: 2688, status: 'Cancelled', createdAt: '2026-03-26' },
  { id: 'HSR006', guest: 'Meera Reddy', email: 'meera@email.com', phone: '+91-9876543215', room: 'Standard Room', checkIn: '2026-04-02', checkOut: '2026-04-04', guests: 1, amount: 1792, status: 'Pending', createdAt: '2026-03-26' },
  { id: 'HSR007', guest: 'Arjun Nair', email: 'arjun@email.com', phone: '+91-9876543216', room: 'Super Deluxe', checkIn: '2026-04-05', checkOut: '2026-04-08', guests: 3, amount: 5376, status: 'Confirmed', createdAt: '2026-03-27' },
]

export default function BookingManagement() {
  const [bookings, setBookings] = useState(allBookings)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [viewBooking, setViewBooking] = useState(null)

  const filtered = bookings.filter(b => {
    const matchSearch = b.guest.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || b.status.toLowerCase() === statusFilter
    return matchSearch && matchStatus
  })

  const updateStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
    setViewBooking(null)
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-page-header">
          <div><h1>Booking Management</h1><p>View and manage all hotel bookings.</p></div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} />
            <input type="text" className="form-input" placeholder="Search by guest name or booking ID..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '36px' }} id="booking-search" />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {['all', 'confirmed', 'pending', 'cancelled'].map(s => (
              <button key={s} className={`filter-btn ${statusFilter === s ? 'filter-active' : ''}`} onClick={() => setStatusFilter(s)} id={`filter-${s}`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Guests</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td><strong>{b.id}</strong></td>
                  <td>{b.guest}</td>
                  <td>{b.room}</td>
                  <td>{new Date(b.checkIn).toLocaleDateString('en-IN')}</td>
                  <td>{new Date(b.checkOut).toLocaleDateString('en-IN')}</td>
                  <td>{b.guests}</td>
                  <td>₹{b.amount.toLocaleString()}</td>
                  <td><span className={`badge ${b.status === 'Confirmed' ? 'badge-green' : b.status === 'Pending' ? 'badge-gold' : 'badge-red'}`}>{b.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                      <button className="btn btn-sm btn-secondary" onClick={() => setViewBooking(b)} style={{ padding: '4px 8px' }} id={`view-${b.id}`}><Eye size={14} /></button>
                      {b.status === 'Pending' && (
                        <>
                          <button className="btn btn-sm" onClick={() => updateStatus(b.id, 'Confirmed')} style={{ padding: '4px 8px', background: 'var(--secondary-container)', color: 'var(--secondary)' }} id={`confirm-${b.id}`}><CheckCircle size={14} /></button>
                          <button className="btn btn-sm" onClick={() => updateStatus(b.id, 'Cancelled')} style={{ padding: '4px 8px', background: '#FFDAD6', color: 'var(--error)' }} id={`cancel-${b.id}`}><XCircle size={14} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--outline)' }}>No bookings found.</p>}
        </div>

        {viewBooking && (
          <div className="admin-modal-overlay" onClick={() => setViewBooking(null)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <h2>Booking Details — {viewBooking.id}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {[
                  ['Guest Name', viewBooking.guest], ['Email', viewBooking.email], ['Phone', viewBooking.phone],
                  ['Room', viewBooking.room], ['Check-in', new Date(viewBooking.checkIn).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
                  ['Check-out', new Date(viewBooking.checkOut).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
                  ['Guests', viewBooking.guests], ['Amount', '₹' + viewBooking.amount.toLocaleString()], ['Booked On', new Date(viewBooking.createdAt).toLocaleDateString('en-IN')],
                ].map(([label, value], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--outline)' }}>{label}</span><strong>{value}</strong>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--outline)' }}>Status</span>
                  <span className={`badge ${viewBooking.status === 'Confirmed' ? 'badge-green' : viewBooking.status === 'Pending' ? 'badge-gold' : 'badge-red'}`}>{viewBooking.status}</span>
                </div>
              </div>
              <div className="admin-modal-actions" style={{ marginTop: 'var(--space-6)' }}>
                {viewBooking.status === 'Pending' && <button className="btn btn-primary btn-sm" onClick={() => updateStatus(viewBooking.id, 'Confirmed')}>Confirm</button>}
                {viewBooking.status !== 'Cancelled' && <button className="btn btn-sm" onClick={() => updateStatus(viewBooking.id, 'Cancelled')} style={{ background: '#FFDAD6', color: 'var(--error)' }}>Cancel</button>}
                <button className="btn btn-secondary btn-sm" onClick={() => setViewBooking(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
