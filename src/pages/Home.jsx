import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, ChevronLeft, ChevronRight, Wifi, Car, UtensilsCrossed, Mountain, Flame, ShieldCheck, Snowflake, Luggage, Shirt, Map, Clock, Zap } from 'lucide-react'
import { rooms, amenities, testimonials, hotelInfo } from '../data/hotelData'
import RoomCard from '../components/RoomCard'
import './Home.css'

const iconMap = { Wifi, Car, UtensilsCrossed, Mountain, Flame, ShieldCheck, Snowflake, Luggage, Shirt, Map, Clock, Zap }

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [visibleSections, setVisibleSections] = useState(new Set())
  const sectionRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="page-wrapper">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" alt="Himalayan Mountains" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content container">
          <div className="hero-text" data-animate id="hero-text">
            <span className="hero-label">Welcome to</span>
            <h1 className="hero-title">Hotel Shimla<br />Regency</h1>
            <p className="hero-subtitle">{hotelInfo.shortDescription}</p>
            <div className="hero-actions">
              <Link to="/booking" className="btn btn-primary btn-lg" id="hero-book-btn">
                Book Your Stay <ArrowRight size={18} />
              </Link>
              <Link to="/rooms" className="btn btn-outline btn-lg hero-explore-btn" id="hero-explore-btn">
                Explore Rooms
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">15+</span>
                <span className="hero-stat-label">Luxury Rooms</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">4.5★</span>
                <span className="hero-stat-label">Guest Rating</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-value">Since 2010</span>
                <span className="hero-stat-label">Serving Guests</span>
              </div>
            </div>
          </div>
          <div className="hero-booking-card glass" data-animate id="hero-quick-book">
            <h3>Quick Reservation</h3>
            <div className="quick-book-form">
              <div className="form-group">
                <label className="form-label">Check-in</label>
                <input type="date" className="form-input" id="quick-checkin" />
              </div>
              <div className="form-group">
                <label className="form-label">Check-out</label>
                <input type="date" className="form-input" id="quick-checkout" />
              </div>
              <div className="form-group">
                <label className="form-label">Guests</label>
                <select className="form-input" id="quick-guests">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                </select>
              </div>
              <Link to="/booking" className="btn btn-primary btn-lg" id="quick-book-btn" style={{ width: '100%' }}>
                Check Availability
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
        </div>
      </section>

      {/* About Section */}
      <section className="home-about section-padding" id="about-section" data-animate>
        <div className="container">
          <div className="home-about-grid">
            <div className="home-about-images">
              <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80" alt="Hotel Exterior" className="about-img-main" loading="lazy" />
              <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80" alt="Hotel Entrance" className="about-img-secondary" loading="lazy" />
            </div>
            <div className="home-about-content">
              <span className="section-label">About Us</span>
              <h2 className="section-title">A Sanctuary in the<br />Heart of Shimla</h2>
              <p className="section-subtitle">{hotelInfo.description}</p>
              <div className="about-features">
                <div className="about-feature">
                  <Mountain size={20} />
                  <span>Panoramic Mountain Views</span>
                </div>
                <div className="about-feature">
                  <UtensilsCrossed size={20} />
                  <span>Multi-Cuisine Restaurant</span>
                </div>
                <div className="about-feature">
                  <Flame size={20} />
                  <span>Evening Bonfire</span>
                </div>
                <div className="about-feature">
                  <ShieldCheck size={20} />
                  <span>Safe & Secure</span>
                </div>
              </div>
              <Link to="/about" className="btn btn-secondary" id="about-learn-more">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="home-rooms section-padding" id="rooms-section" data-animate>
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Accommodation</span>
            <h2 className="section-title">Our Rooms & Suites</h2>
            <p className="section-subtitle">Choose from our carefully curated selection of rooms, each designed to provide maximum comfort with stunning Himalayan views.</p>
          </div>
          <div className="rooms-grid">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
          <div className="rooms-cta">
            <Link to="/rooms" className="btn btn-outline" id="view-all-rooms">
              View All Rooms <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="home-amenities section-padding" id="amenities-section" data-animate>
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Amenities</span>
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-subtitle">From high-speed Wi-Fi to guided mountain tours, we have everything to make your stay perfect.</p>
          </div>
          <div className="amenities-grid">
            {amenities.map((amenity, i) => {
              const IconComp = iconMap[amenity.icon]
              return (
                <div className="amenity-card" key={i} id={`amenity-${i}`} style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="amenity-icon">
                    {IconComp && <IconComp size={24} strokeWidth={1.5} />}
                  </div>
                  <h4 className="amenity-name">{amenity.name}</h4>
                  <p className="amenity-desc">{amenity.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="home-testimonials section-padding" id="testimonials-section" data-animate>
        <div className="container">
          <div className="testimonials-layout">
            <div className="testimonials-left">
              <span className="section-label">Testimonials</span>
              <h2 className="section-title">What Our<br />Guests Say</h2>
              <p className="section-subtitle">Real stories from real guests who made unforgettable memories at Hotel Shimla Regency.</p>
              <div className="testimonial-nav">
                <button
                  className="testimonial-nav-btn"
                  onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                  id="testimonial-prev"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="testimonial-counter">{currentTestimonial + 1} / {testimonials.length}</span>
                <button
                  className="testimonial-nav-btn"
                  onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)}
                  id="testimonial-next"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="testimonial-card-wrapper">
              {testimonials.map((t, i) => (
                <div key={i} className={`testimonial-card ${i === currentTestimonial ? 'testimonial-active' : ''}`}>
                  <div className="testimonial-stars">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} fill="var(--warm-gold)" color="var(--warm-gold)" />
                    ))}
                  </div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.location} • {t.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta" id="cta-section">
        <div className="cta-bg">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80" alt="Mountain View" />
          <div className="cta-overlay" />
        </div>
        <div className="container cta-content">
          <h2>Ready for an Unforgettable<br />Mountain Escape?</h2>
          <p>Book your stay today and experience the magic of Shimla from our hillside sanctuary.</p>
          <div className="cta-actions">
            <Link to="/booking" className="btn btn-primary btn-lg" id="cta-book">
              Reserve Now <ArrowRight size={18} />
            </Link>
            <a href={`tel:${hotelInfo.phone[0]}`} className="btn btn-outline btn-lg cta-call" id="cta-call">
              Call +91-82196 22640
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
