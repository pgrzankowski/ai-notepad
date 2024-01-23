import React from 'react'
import Welcome from "./Welcome"
import SignUp from './SignUp'
import Login from './Login'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome/>} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </Router>
  )
}
