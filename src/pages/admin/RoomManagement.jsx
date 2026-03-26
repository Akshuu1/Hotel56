import { useState } from 'react'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import AdminSidebar from '../../components/AdminSidebar'
import { rooms as initialRooms } from '../../data/hotelData'
import './Admin.css'

export default function RoomManagement() {
  const [rooms, setRooms] = useState(initialRooms)
  const [showModal, setShowModal] = useState(false)
  const [editRoom, setEditRoom] = useState(null)
  const [form, setForm] = useState({ name: '', price: '', size: '', maxGuests: 2, bed: '', description: '', available: 5 })

  const openAdd = () => { setEditRoom(null); setForm({ name: '', price: '', size: '', maxGuests: 2, bed: '', description: '', available: 5 }); setShowModal(true) }
  const openEdit = (room) => { setEditRoom(room); setForm({ name: room.name, price: room.price, size: room.size, maxGuests: room.maxGuests, bed: room.bed, description: room.description, available: room.available }); setShowModal(true) }

  const handleSave = (e) => {
    e.preventDefault()
    if (editRoom) {
      setRooms(prev => prev.map(r => r.id === editRoom.id ? { ...r, ...form, price: +form.price, maxGuests: +form.maxGuests, available: +form.available } : r))
    } else {
      const newRoom = { ...form, id: 'room-' + Date.now(), price: +form.price, maxGuests: +form.maxGuests, available: +form.available, originalPrice: Math.round(+form.price * 1.5), image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80', images: [], amenities: [] }
      setRooms(prev => [...prev, newRoom])
    }
    setShowModal(false)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this room?')) {
      setRooms(prev => prev.filter(r => r.id !== id))
    }
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-page-header">
          <div><h1>Room Management</h1><p>Manage your hotel rooms, pricing, and availability.</p></div>
          <button className="btn btn-primary btn-sm" onClick={openAdd} id="add-room"><Plus size={16} /> Add Room</button>
        </div>

        <div className="admin-rooms-grid">
          {rooms.map(room => (
            <div key={room.id} className="admin-room-card" id={`admin-room-${room.id}`}>
              <div className="admin-room-image">
                <img src={room.image} alt={room.name} loading="lazy" />
              </div>
              <div className="admin-room-info">
                <h4>{room.name}</h4>
                <div className="admin-room-meta">
                  <span className="room-price-current" style={{ fontSize: '1.125rem' }}>₹{room.price.toLocaleString()}/night</span>
                  <span className="badge badge-green">{room.available} available</span>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: '0.8125rem', color: 'var(--outline)', marginBottom: 'var(--space-3)' }}>
                  <span>{room.size}</span><span>•</span><span>{room.maxGuests} guests</span><span>•</span><span>{room.bed}</span>
                </div>
                <div className="admin-room-actions">
                  <button className="btn btn-secondary btn-sm" onClick={() => openEdit(room)} id={`edit-room-${room.id}`}><Edit size={14} /> Edit</button>
                  <button className="btn btn-sm" onClick={() => handleDelete(room.id)} style={{ background: '#FFDAD6', color: 'var(--error)' }} id={`delete-room-${room.id}`}><Trash2 size={14} /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                <h2 style={{ margin: 0 }}>{editRoom ? 'Edit Room' : 'Add New Room'}</h2>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', color: 'var(--outline)' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleSave} className="admin-modal-form" id="room-modal-form">
                <div className="form-group"><label className="form-label">Room Name</label><input type="text" className="form-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required id="modal-room-name" /></div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Price (₹/night)</label><input type="number" className="form-input" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required id="modal-room-price" /></div>
                  <div className="form-group"><label className="form-label">Size (sq.ft)</label><input type="text" className="form-input" value={form.size} onChange={e => setForm(p => ({ ...p, size: e.target.value }))} required id="modal-room-size" /></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Max Guests</label><input type="number" className="form-input" value={form.maxGuests} onChange={e => setForm(p => ({ ...p, maxGuests: e.target.value }))} id="modal-room-guests" /></div>
                  <div className="form-group"><label className="form-label">Available Rooms</label><input type="number" className="form-input" value={form.available} onChange={e => setForm(p => ({ ...p, available: e.target.value }))} id="modal-room-available" /></div>
                </div>
                <div className="form-group"><label className="form-label">Bed Type</label><input type="text" className="form-input" value={form.bed} onChange={e => setForm(p => ({ ...p, bed: e.target.value }))} id="modal-room-bed" /></div>
                <div className="form-group"><label className="form-label">Description</label><textarea className="form-input form-textarea" rows="3" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} id="modal-room-desc" /></div>
                <div className="admin-modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" id="modal-room-save">{editRoom ? 'Save Changes' : 'Add Room'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
