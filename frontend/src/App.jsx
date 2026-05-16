import React from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import AppRoutes from './app/Routes/AppRoutes'

function App() {
  return (
      <Router>
        <Navbar></Navbar>
        <AppRoutes></AppRoutes>
      </Router>
  )
}
export default App