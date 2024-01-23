import React from 'react'
import Home from "./Home"
import SignUp from './SignUp'
import Login from './Login'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App