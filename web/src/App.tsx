import './styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import React from 'react'

import { AuthProvider } from './contexts/auth'
import Routes from './routes'
import { ToastContainer } from 'react-toastify'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Routes />
    </AuthProvider>
  )
}

export default App
