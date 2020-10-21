import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {

  const emailRef = useRef()
  const { resetPassword } = useAuth();
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const componentRef = useRef(true)

  useEffect(() => {
    // on unmount
    return () => {
      componentRef.current = false;
    }
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('')
      setMessage('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    }catch{
      setError('Email does not exist!')
    }
    if(componentRef.current) {
      setLoading(false)
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to='/login'>Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <span>Don't have an account? </span>
        <Link to='/signup'>Sign up</Link>
      </div>
    </>
  )
}
