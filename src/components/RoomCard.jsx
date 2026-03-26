import { Link } from 'react-router-dom'
import { Star, Users, Maximize2 } from 'lucide-react'
import './RoomCard.css'

export default function RoomCard({ room, featured = false }) {
  return (
    <div className={`room-card ${featured ? 'room-card-featured' : ''}`} id={`room-${room.id}`}>
      <div className="room-card-image">
        <img src={room.image} alt={room.name} loading="lazy" />
        <div className="room-card-badge">
          {room.originalPrice > room.price && (
            <span className="badge badge-gold">
              {Math.round((1 - room.price / room.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </div>
      <div className="room-card-content">
        <h3 className="room-card-name">{room.name}</h3>
        <div className="room-card-meta">
          <span className="room-meta-item"><Maximize2 size={14} /> {room.size}</span>
          <span className="room-meta-item"><Users size={14} /> {room.maxGuests} Guests</span>
          <span className="room-meta-item">{room.bed}</span>
        </div>
        <p className="room-card-desc">{room.description.substring(0, 120)}...</p>
        <div className="room-card-amenities">
          {room.amenities.slice(0, 4).map((a, i) => (
            <span key={i} className="room-amenity-tag">{a}</span>
          ))}
          {room.amenities.length > 4 && (
            <span className="room-amenity-tag">+{room.amenities.length - 4} more</span>
          )}
        </div>
        <div className="room-card-footer">
          <div className="room-card-pricing">
            {room.originalPrice > room.price && (
              <span className="room-price-original">₹{room.originalPrice.toLocaleString()}</span>
            )}
            <span className="room-price-current">₹{room.price.toLocaleString()}</span>
            <span className="room-price-unit">/night</span>
          </div>
          <Link to={`/booking/${room.id}`} className="btn btn-primary btn-sm" id={`book-${room.id}`}>
            Book Now
          </Link>
        </div>
        {room.available <= 3 && (
          <div className="room-availability-warning">
            🔥 Only {room.available} rooms left!
          </div>
        )}
      </div>
    </div>
  )
}
