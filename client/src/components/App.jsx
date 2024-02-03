import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import Welcome from "./Welcome"
import SignUp from './SignUp'
import Login from './Login'
import Home from './Home'
import CreateNote from './CreateNote'
import EditNote from './EditNote'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Welcome/>} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/create-note" element={<CreateNote/>} />
        <Route exact path="/edit-note" element={<EditNote/>} />
      </Routes>
      <Footer />
    </Router>
  )
}
