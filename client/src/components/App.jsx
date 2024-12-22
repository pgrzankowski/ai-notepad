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
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { CookiesProvider, useCookies } from 'react-cookie'


export default function App() {

  const [cookies] = useCookies(['access_token'])
  const isAuth = cookies.access_token ? true : false

  return (
    <CookiesProvider defaultSetOptions={{path: '/'}}>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={!isAuth ? <Welcome/> : <Home/>} />
          <Route exact path="/signup" element={<SignUp/>} />
          <Route exact path="/login" element={<Login/>} />

          <Route exact path='/home' element={isAuth ? <Home/> : <Login/>} />
          <Route exact path='/create-note' element={isAuth ? <CreateNote/> : <Login/>} />
          <Route exact path="/edit-note" element={isAuth ? <EditNote/> : <Login/>} />
          <Route exact path="/chat-bot" element={isAuth ? <ChatBot/> : <Login/>} />
        </Routes>
        <Footer />
      </Router>
    </CookiesProvider>
  )
}
