import { Link } from 'react-router-dom'
import { Mountain, Phone, Mail, MapPin, ArrowUp } from 'lucide-react'
import { hotelInfo } from '../data/hotelData'
import './Footer.css'

const SocialIcon = ({ children, ariaLabel, id }) => (
  <a href="#" className="social-link" id={id} aria-label={ariaLabel}>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {children}
    </svg>
  </a>
)

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer" id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <Mountain size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="footer-brand-name">Shimla Regency</h3>
                  <p className="footer-brand-tagline">A Himalayan Sanctuary</p>
                </div>
              </div>
              <p className="footer-desc">{hotelInfo.shortDescription}</p>
              <div className="footer-socials">
                <SocialIcon id="social-instagram" ariaLabel="Instagram">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </SocialIcon>
                <SocialIcon id="social-facebook" ariaLabel="Facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </SocialIcon>
                <SocialIcon id="social-twitter" ariaLabel="Twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </SocialIcon>
                <SocialIcon id="social-youtube" ariaLabel="YouTube">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.46-5.58z"></path>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
                </SocialIcon>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-heading">Quick Links</h4>
              <div className="footer-links">
                <Link to="/" id="footer-home">Home</Link>
                <Link to="/rooms" id="footer-rooms">Rooms & Suites</Link>
                <Link to="/gallery" id="footer-gallery">Gallery</Link>
                <Link to="/about" id="footer-about">About Us</Link>
                <Link to="/booking" id="footer-booking">Book a Room</Link>
                <Link to="/contact" id="footer-contact">Contact</Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4 className="footer-heading">Contact Us</h4>
              <div className="footer-contact-list">
                <div className="footer-contact-item">
                  <MapPin size={16} strokeWidth={1.5} />
                  <span>{hotelInfo.address}</span>
                </div>
                <div className="footer-contact-item">
                  <Phone size={16} strokeWidth={1.5} />
                  <a href={`tel:${hotelInfo.phone[0]}`}>{hotelInfo.phone[0]}</a>
                </div>
                <div className="footer-contact-item">
                  <Phone size={16} strokeWidth={1.5} />
                  <a href={`tel:${hotelInfo.phone[1]}`}>{hotelInfo.phone[1]}</a>
                </div>
                <div className="footer-contact-item">
                  <Mail size={16} strokeWidth={1.5} />
                  <a href={`mailto:${hotelInfo.email}`}>{hotelInfo.email}</a>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="footer-section">
              <h4 className="footer-heading">Newsletter</h4>
              <p className="footer-newsletter-text">Subscribe for exclusive offers and travel tips.</p>
              <form className="footer-newsletter" onSubmit={e => e.preventDefault()} id="newsletter-form">
                <input
                  type="email"
                  placeholder="Your email"
                  className="form-input footer-email"
                  id="newsletter-email"
                />
                <button type="submit" className="btn btn-primary btn-sm" id="newsletter-submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Hotel Shimla Regency. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#" id="footer-privacy">Privacy Policy</a>
            <a href="#" id="footer-terms">Terms & Conditions</a>
            <Link to="/admin" id="footer-admin">Admin</Link>
          </div>
          <button className="scroll-top-btn" onClick={scrollToTop} id="scroll-top" aria-label="Scroll to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}
