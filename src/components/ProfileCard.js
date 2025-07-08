import React from 'react'
import {BiArrowBack} from 'react-icons/bi'
import '../styles/components/profileCard.css'

class ProfileCard extends React.Component {
  render() {
    const {user, onBack} = this.props

    return (
      <div className="profile-card">
        <div className="profile-header">
          <button onClick={onBack} className="btn btn-back">
            <BiArrowBack size={20} />
          </button>
          <h2>Welcome, {user.name}</h2>
        </div>

        <div className="profile-content">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user.name
                .split(' ')
                .map(word => word.charAt(0))
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </div>
            <div className="profile-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label">User ID</span>
              <span className="detail-value">{user.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Name</span>
              <span className="detail-value">{user.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email ID</span>
              <span className="detail-value">{user.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Address</span>
              <span className="detail-value">
                {user.address.street}, {user.address.suite}, {user.address.city}
                , {user.address.zipcode}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Phone</span>
              <span className="detail-value">{user.phone}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileCard
