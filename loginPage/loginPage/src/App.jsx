import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SignupForm from './pages/Signup'
import Login from './pages/Login'
import { Outlet } from 'react-router-dom';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main className="bg-cyan-600">
      <Outlet></Outlet>
    </main>
    </>
  )
}

export default App
