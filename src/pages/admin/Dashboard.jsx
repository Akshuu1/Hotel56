import { useState } from 'react'
import { CalendarCheck, IndianRupee, Percent, Users, Plus, FileText, TrendingUp, BedDouble } from 'lucide-react'
import AdminSidebar from '../../components/AdminSidebar'
import './Admin.css'

const recentBookings = [
  { id: 'HSR001', guest: 'Rajesh Kumar', room: 'Deluxe Room', checkIn: '2026-03-28', checkOut: '2026-03-30', amount: 2688, status: 'Confirmed' },
  { id: 'HSR002', guest: 'Priya Sharma', room: 'Family Suite', checkIn: '2026-03-27', checkOut: '2026-03-29', amount: 4480, status: 'Confirmed' },
  { id: 'HSR003', guest: 'Amit Patel', room: 'Standard Room', checkIn: '2026-03-29', checkOut: '2026-03-31', amount: 1792, status: 'Pending' },
  { id: 'HSR004', guest: 'Sneha Kapoor', room: 'Super Deluxe', checkIn: '2026-03-30', checkOut: '2026-04-02', amount: 5376, status: 'Confirmed' },
  { id: 'HSR005', guest: 'Vikram Singh', room: 'Deluxe Room', checkIn: '2026-04-01', checkOut: '2026-04-03', amount: 2688, status: 'Cancelled' },
]

export default function Dashboard() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-page-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your hotel overview.</p>
          </div>
          <div className="quick-actions">
            <button className="btn btn-primary btn-sm" id="admin-new-booking"><Plus size={16} /> New Booking</button>
            <button className="btn btn-secondary btn-sm" id="admin-reports"><FileText size={16} /> Reports</button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            { label: 'Total Bookings', value: '156', change: '+12%', positive: true, icon: CalendarCheck, color: 'gold' },
            { label: 'Revenue', value: '₹2,45,000', change: '+8%', positive: true, icon: IndianRupee, color: 'green' },
            { label: 'Occupancy Rate', value: '78%', change: '+5%', positive: true, icon: Percent, color: 'blue' },
            { label: 'Today Check-ins', value: '5', change: '2 pending', positive: true, icon: Users, color: 'rose' },
          ].map((stat, i) => (
            <div key={i} className="stat-card" id={`stat-${i}`}>
              <div className="stat-card-header">
                <div className={`stat-card-icon ${stat.color}`}><stat.icon size={22} /></div>
                {stat.positive && <TrendingUp size={16} color="var(--secondary)" />}
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>{stat.change} this month</div>
            </div>
          ))}
        </div>

        {/* Revenue Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
          <div className="admin-card">
            <div className="admin-card-header">
              <h3>Revenue Overview</h3>
              <select className="form-input" style={{ width: 'auto', padding: '0.375rem 0.75rem', fontSize: '0.8125rem' }} id="revenue-period">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 'var(--space-2)', height: '200px', alignItems: 'flex-end' }}>
              {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '100%', height: `${h}%`, background: `linear-gradient(to top, var(--primary), var(--primary-container))`, borderRadius: 'var(--radius-sm)', transition: 'height 0.5s ease', minHeight: '20px' }} />
                  <span style={{ fontSize: '0.6875rem', color: 'var(--outline)' }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header"><h3>Room Status</h3></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                { type: 'Occupied', count: 9, total: 15, color: 'var(--primary-container)' },
                { type: 'Available', count: 4, total: 15, color: 'var(--secondary-container)' },
                { type: 'Maintenance', count: 2, total: 15, color: 'var(--misty-rose)' },
              ].map((r, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '4px' }}>
                    <span>{r.type}</span><span style={{ fontWeight: 600 }}>{r.count}/{r.total}</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--surface-container)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(r.count / r.total) * 100}%`, background: r.color, borderRadius: '4px', transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="admin-table-card">
          <div className="admin-table-header">
            <h3>Recent Bookings</h3>
            <button className="btn btn-secondary btn-sm" id="view-all-bookings">View All</button>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map(b => (
                <tr key={b.id}>
                  <td><strong>{b.id}</strong></td>
                  <td>{b.guest}</td>
                  <td>{b.room}</td>
                  <td>{new Date(b.checkIn).toLocaleDateString('en-IN')}</td>
                  <td>{new Date(b.checkOut).toLocaleDateString('en-IN')}</td>
                  <td>₹{b.amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${b.status === 'Confirmed' ? 'badge-green' : b.status === 'Pending' ? 'badge-gold' : 'badge-red'}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
