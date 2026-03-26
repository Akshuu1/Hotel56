import { useState } from 'react'
import { rooms } from '../data/hotelData'
import RoomCard from '../components/RoomCard'
import './Rooms.css'

export default function Rooms() {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('default')

  let filteredRooms = [...rooms]
  if (filter === 'budget') filteredRooms = filteredRooms.filter(r => r.price <= 1000)
  if (filter === 'premium') filteredRooms = filteredRooms.filter(r => r.price > 1000)

  if (sort === 'low') filteredRooms.sort((a, b) => a.price - b.price)
  if (sort === 'high') filteredRooms.sort((a, b) => b.price - a.price)

  return (
    <main className="page-wrapper">
      {/* Hero */}
      <section className="rooms-hero">
        <div className="rooms-hero-bg">
          <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1920&q=80" alt="Rooms" />
          <div className="rooms-hero-overlay" />
        </div>
        <div className="container rooms-hero-content">
          <span className="section-label" style={{ color: 'var(--primary-container)' }}>Accommodation</span>
          <h1>Our Rooms & Suites</h1>
          <p>Each room is a window to the majestic Himalayas, designed with comfort and elegance in mind.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="rooms-filters section-padding-sm">
        <div className="container">
          <div className="filters-bar">
            <div className="filter-group">
              <span className="filter-label">Filter:</span>
              <button className={`filter-btn ${filter === 'all' ? 'filter-active' : ''}`} onClick={() => setFilter('all')} id="filter-all">All Rooms</button>
              <button className={`filter-btn ${filter === 'budget' ? 'filter-active' : ''}`} onClick={() => setFilter('budget')} id="filter-budget">Budget (≤₹1,000)</button>
              <button className={`filter-btn ${filter === 'premium' ? 'filter-active' : ''}`} onClick={() => setFilter('premium')} id="filter-premium">Premium (&gt;₹1,000)</button>
            </div>
            <div className="filter-group">
              <span className="filter-label">Sort:</span>
              <select className="form-input filter-select" value={sort} onChange={e => setSort(e.target.value)} id="sort-rooms">
                <option value="default">Default</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Room Listings */}
      <section className="rooms-list section-padding">
        <div className="container">
          <div className="rooms-detail-grid">
            {filteredRooms.map(room => (
              <div key={room.id} className="room-detail-wrapper">
                <div className="room-detail-card" id={`room-detail-${room.id}`}>
                  <div className="room-detail-gallery">
                    <div className="room-detail-main-image">
                      <img src={room.images[0]} alt={room.name} loading="lazy" />
                      {room.originalPrice > room.price && (
                        <span className="badge badge-gold room-detail-badge">
                          {Math.round((1 - room.price / room.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                    <div className="room-detail-thumbs">
                      {room.images.slice(1).map((img, i) => (
                        <img key={i} src={img} alt={`${room.name} ${i + 2}`} loading="lazy" />
                      ))}
                    </div>
                  </div>
                  <div className="room-detail-info">
                    <h2>{room.name}</h2>
                    <div className="room-detail-meta">
                      <span>{room.size}</span>
                      <span>{room.maxGuests} Guests</span>
                      <span>{room.bed}</span>
                    </div>
                    <p className="room-detail-desc">{room.description}</p>
                    <div className="room-detail-amenities">
                      <h4>Amenities</h4>
                      <div className="room-detail-amenity-grid">
                        {room.amenities.map((a, i) => (
                          <span key={i} className="room-amenity-tag">✓ {a}</span>
                        ))}
                      </div>
                    </div>
                    <div className="room-detail-footer">
                      <div className="room-detail-pricing">
                        {room.originalPrice > room.price && (
                          <span className="room-price-original">₹{room.originalPrice.toLocaleString()}</span>
                        )}
                        <span className="room-price-current">₹{room.price.toLocaleString()}</span>
                        <span className="room-price-unit">/night</span>
                      </div>
                      <a href={`/booking/${room.id}`} className="btn btn-primary" id={`book-detail-${room.id}`}>
                        Book This Room
                      </a>
                    </div>
                    {room.available <= 3 && (
                      <div className="room-availability-warning" style={{ marginTop: 'var(--space-3)' }}>
                        🔥 Only {room.available} rooms left today!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
