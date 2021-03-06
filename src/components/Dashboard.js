import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Dashboard() {

  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async() => {
    setError('')
    try {
      await logout();
      history.push('/login')
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <>
      <Card>
        <Card.Body> 
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <span> <strong>Email: </strong> {user.email}</span>
          <Link to="/profile/update" className="btn btn-primary w-100 mt-3">Update Profile</Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  )
}
