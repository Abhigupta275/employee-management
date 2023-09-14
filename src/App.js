import React from 'react'
import Register from './components/Register'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Read from './components/Read'
import Update from './components/Update'
import View from './components/View'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/read' element={<Read />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/view/:id' element={<View />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App