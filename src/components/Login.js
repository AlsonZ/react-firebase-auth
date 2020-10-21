import React, { useEffect, useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const componentRef = useRef(true)
  const history = useHistory();

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
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    }catch (e){
      setError(e.message)
    }
    if(componentRef.current) {
      setLoading(false)
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Log in</Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to='/forgot-password'>Forgot Password?</Link>
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
