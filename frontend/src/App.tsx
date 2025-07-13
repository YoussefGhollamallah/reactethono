import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Header from './components/Header'
import Home from './pages/Home'

function App() {
  return (
    <div className="min-h-screen bg-custom-dark text-custom-light">
      <BrowserRouter>
        <Header />
        <main className="min-h-[calc(100vh-80px)] flex justify-center items-center p-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
