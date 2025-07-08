import { useNavigate } from 'react-router-dom'
import '../styles/components/Navbar.css'

const Navbar = ({ user }) => {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <img src="/swift-logo.png" alt="Company Logo" className="logo" />
          WIFT
        </div>

        <div className="user-container" onClick={() => navigate('/profile')}>
          <div className="avatar-circle">
            {user.name.split(' ').map(word => word.charAt(0)).slice(0, 2).join('').toUpperCase()}
            </div>
          <span>{user.name}</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
