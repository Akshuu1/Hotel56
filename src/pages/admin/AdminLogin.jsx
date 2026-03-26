import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mountain, Eye, EyeOff } from 'lucide-react'
import './Admin.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === 'admin@shimlaregency.com' && password === 'admin123') {
      sessionStorage.setItem('adminAuth', 'true')
      navigate('/admin/dashboard')
    } else {
      setError('Invalid credentials. Use admin@shimlaregency.com / admin123')
    }
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="logo-icon" style={{ margin: '0 auto var(--space-4)' }}>
            <Mountain size={24} strokeWidth={1.5} />
          </div>
          <h2>Admin Panel</h2>
          <p>Hotel Shimla Regency Management</p>
        </div>

        {error && <div className="admin-error">{error}</div>}

        <form onSubmit={handleLogin} className="admin-login-form" id="admin-login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="admin@shimlaregency.com" value={email} onChange={e => setEmail(e.target.value)} required id="admin-email" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-field">
              <input type={showPass ? 'text' : 'password'} className="form-input" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required id="admin-password" />
              <button type="button" className="password-toggle" onClick={() => setShowPass(!showPass)} aria-label="Toggle password">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} id="admin-login-btn">
            Sign In
          </button>
        </form>

        <p className="admin-demo-text">Demo: admin@shimlaregency.com / admin123</p>
      </div>
    </main>
  )
}
