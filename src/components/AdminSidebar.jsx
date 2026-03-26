import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mountain, LayoutDashboard, BedDouble, CalendarCheck, Settings, LogOut } from 'lucide-react'

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/rooms', label: 'Rooms', icon: BedDouble },
  { path: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionStorage.getItem('adminAuth')) navigate('/admin')
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    navigate('/admin')
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="logo-icon"><Mountain size={18} strokeWidth={1.5} /></div>
        <div>
          <h3 style={{ color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.875rem' }}>Shimla Regency</h3>
          <span>Admin Panel</span>
        </div>
      </div>
      <nav className="admin-nav">
        {navItems.map(item => (
          <Link key={item.path} to={item.path} className={`admin-nav-link ${location.pathname === item.path ? 'nav-active' : ''}`} id={`admin-nav-${item.label.toLowerCase()}`}>
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
        <button className="admin-nav-link admin-nav-logout" onClick={handleLogout} id="admin-logout">
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </aside>
  )
}
