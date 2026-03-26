import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Mountain, Phone } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/rooms', label: 'Rooms' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} id="main-nav">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo" id="nav-logo">
          <div className="logo-icon">
            <Mountain size={24} strokeWidth={1.5} />
          </div>
          <div className="logo-text">
            <span className="logo-name">Shimla Regency</span>
            <span className="logo-tagline">A Himalayan Sanctuary</span>
          </div>
        </Link>

        <div className={`navbar-links ${isOpen ? 'navbar-links-open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
              id={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/booking" className="btn btn-primary btn-sm nav-booking-btn" id="nav-book-btn">
            Book Now
          </Link>
        </div>

        <div className="navbar-right">
          <a href="tel:+918219622640" className="nav-phone" id="nav-phone">
            <Phone size={16} strokeWidth={1.5} />
            <span>+91-82196 22640</span>
          </a>
          <Link to="/booking" className="btn btn-primary btn-sm nav-booking-desktop" id="nav-book-desktop">
            Book Now
          </Link>
          <button
            className="navbar-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            id="nav-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
