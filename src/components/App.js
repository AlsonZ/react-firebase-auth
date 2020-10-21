import React from 'react';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';

function App() {
  return (
    <AuthProvider>
      <Container 
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh'}}
      >
        <div className="w-100" style={{ maxWidth: "400px"}}>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard}/>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/forgot-password" component={ForgotPassword}/>
              <Route path="/profile/update" component={UpdateProfile}/>
            </Switch>
          </Router>
        </div>
      </Container>
    </AuthProvider>
  )
  
}

export default App;
