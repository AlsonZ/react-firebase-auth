import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function UpdateProfile() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const { user, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    // error checks
    if(passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match!')
    }

    const promises = []
    setLoading(true)
    setError('')
    if(emailRef.current.value !== user.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if(passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() => {
      history.push('/')
    }).catch(() => {
      setError('Failed to update account')
    }).finally(() => {
      setLoading(false)
    })
  }
  
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required 
              defaultValue={user.email}/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} 
              placeholder="leave blank to keep the same"/>
            </Form.Group>
            <Form.Group id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} 
              placeholder="leave blank to keep the same"/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Update</Button>
          </Form>
        </Card.Body>

      </Card>
      <div className="w-100 text-center mt-2">
        <Link to='/'>Cancel</Link>
      </div>
    </>
  )
}
