import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import apiService from '../services/api'
import Navbar from '../components/Navbar'
import ProfileCard from '../components/ProfileCard'
import '../styles/Profile.css'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await apiService.fetchFirstUser()
        setUser(userData)
        setLoading(false)
      } catch (error) {
        console.error('Failed to load user:', error)
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleBack = () => navigate('/')

  if (isLoading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    )

  return (
    <>
      <Navbar user={user} />
      <div className="profile-container">
        {user && <ProfileCard user={user} onBack={handleBack} />}
      </div>
    </>
  )
}

export default Profile
