import { Link } from 'react-router-dom'
import { Mountain, Users, Award, Leaf, Heart, Shield, ArrowRight, Star, Wifi, Car, UtensilsCrossed, Flame, Snowflake, Clock } from 'lucide-react'
import { hotelInfo } from '../data/hotelData'
import './About.css'

const team = [
  { name: 'Mr. Rajendra Verma', role: 'General Manager', initials: 'RV' },
  { name: 'Mrs. Sunita Sharma', role: 'Operations Manager', initials: 'SS' },
  { name: 'Vikash Thakur', role: 'Head Chef', initials: 'VT' },
  { name: 'Anita Kumari', role: 'Guest Relations', initials: 'AK' },
]

const values = [
  { icon: Heart, title: 'Warm Hospitality', desc: 'Every guest is family. We go above and beyond to make your stay memorable.' },
  { icon: Mountain, title: 'Nature First', desc: 'Our operations respect and preserve the beautiful Himalayan ecosystem.' },
  { icon: Shield, title: 'Safety & Comfort', desc: 'Your safety and comfort are our top priorities, always.' },
  { icon: Leaf, title: 'Sustainability', desc: 'We practice responsible tourism with eco-friendly initiatives.' },
]

export default function About() {
  return (
    <main className="page-wrapper">
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80" alt="Hotel" />
          <div className="about-hero-overlay" />
        </div>
        <div className="container about-hero-content">
          <span className="section-label" style={{ color: 'var(--primary-container)' }}>Our Story</span>
          <h1>About Hotel<br />Shimla Regency</h1>
          <p>A legacy of Himalayan hospitality since 2010.</p>
        </div>
      </section>

      {/* Story */}
      <section className="about-story section-padding">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-content">
              <span className="section-label">Our Journey</span>
              <h2>From a Dream to a<br />Mountain Sanctuary</h2>
              <p>{hotelInfo.description}</p>
              <p>Founded in 2010, Hotel Shimla Regency began as a vision to create an intimate mountain retreat that combines the warmth of traditional Himachali hospitality with modern comforts. Over the years, we have welcomed thousands of guests from across India and the world, each leaving with unforgettable memories of the Himalayan landscape.</p>
              <p>Our commitment to excellence has earned us recognition as one of Shimla's most beloved boutique hotels, where every detail is thoughtfully curated to provide an extraordinary experience.</p>
              <div className="about-stats">
                <div className="about-stat"><span className="about-stat-num">15+</span><span>Years of Service</span></div>
                <div className="about-stat"><span className="about-stat-num">10K+</span><span>Happy Guests</span></div>
                <div className="about-stat"><span className="about-stat-num">4.5★</span><span>Guest Rating</span></div>
                <div className="about-stat"><span className="about-stat-num">15</span><span>Luxury Rooms</span></div>
              </div>
            </div>
            <div className="about-story-images">
              <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80" alt="Hotel" className="about-story-img1" loading="lazy" />
              <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80" alt="Hotel Interior" className="about-story-img2" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values section-padding">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Our Values</span>
            <h2>What We Stand For</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card" id={`value-${i}`}>
                <div className="value-icon"><v.icon size={26} /></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team section-padding">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Our Team</span>
            <h2>The People Behind<br />Your Experience</h2>
            <p className="section-subtitle">A dedicated team committed to making every stay exceptional.</p>
          </div>
          <div className="team-grid">
            {team.map((t, i) => (
              <div key={i} className="team-card" id={`team-${i}`}>
                <div className="team-avatar">{t.initials}</div>
                <h4>{t.name}</h4>
                <span>{t.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="about-awards section-padding">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">Recognition</span>
            <h2>Awards & Accolades</h2>
          </div>
          <div className="awards-grid">
            {[
              { year: '2025', title: 'Best Budget Hotel', org: 'Shimla Tourism Awards' },
              { year: '2024', title: 'Guest Satisfaction Excellence', org: 'TripAdvisor Travelers\' Choice' },
              { year: '2023', title: 'Eco-Friendly Hotel', org: 'Himachal Pradesh Green Awards' },
              { year: '2022', title: 'Best Mountain View Hotel', org: 'North India Hospitality Awards' },
            ].map((a, i) => (
              <div key={i} className="award-card" id={`award-${i}`}>
                <div className="award-icon"><Award size={28} /></div>
                <div className="award-year">{a.year}</div>
                <h4>{a.title}</h4>
                <span>{a.org}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container about-cta-content">
          <h2>Experience Our Hospitality</h2>
          <p>We invite you to be our guest and discover the magic of Hotel Shimla Regency.</p>
          <div className="about-cta-actions">
            <Link to="/booking" className="btn btn-primary btn-lg" id="about-book">Book Your Stay <ArrowRight size={18} /></Link>
            <Link to="/contact" className="btn btn-outline btn-lg" id="about-contact">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
