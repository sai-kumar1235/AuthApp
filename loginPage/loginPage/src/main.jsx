import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './pages/Login.jsx'
import SignupForm from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [{
    path: '/login',
    element: <AuthLayout authentication={false}><Login /></AuthLayout>
  }, {
    path: '/signup',
    element: <AuthLayout authentication={false}><SignupForm /></AuthLayout>
  }, {
    index: true,
    element: <AuthLayout authentication={false}><Home /></AuthLayout>
  }]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)