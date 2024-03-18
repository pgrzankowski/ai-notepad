import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import Welcome from "./Welcome"
import SignUp from './SignUp'
import Login from './Login'
import Home from './Home'
import CreateNote from './CreateNote'
import EditNote from './EditNote'
import ChatBot from './ChatBot'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthProvider from 'react-auth-kit'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import createStore from 'react-auth-kit/createStore'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

export default function App() {
  const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
  });

  return (
    <AuthProvider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Welcome/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/login" element={<Login/>} />

          <Route element={<AuthOutlet fallbackPath='/login' />}>
            <Route exact path='/home' element={<Home/>} />
            <Route exact path='/create-note' element={<CreateNote/>} />
            <Route exact path="/edit-note" element={<EditNote/>} />
            <Route exact path="/chat-bot" element={<ChatBot/>} />
          </Route>

        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}
