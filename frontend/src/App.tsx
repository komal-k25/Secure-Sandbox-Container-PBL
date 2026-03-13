import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Feature from './pages/Feature'
import Security from './pages/Security'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/feature' element={<Feature />} />
          <Route path='/security' element={<Security />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
