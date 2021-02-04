import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import './styles.css'

interface DashboardProps {
  children: React.ReactNode
}

const Dashboard: React.FC<DashboardProps> = ({ children }: DashboardProps) => {
  const history = useHistory()
  const location = useLocation()

  return (
    <div className="main">
      <nav className="nav-bar">
        <div
          className="options"
          onClick={() => history.push('/')}
          style={{
            backgroundColor: `${location.pathname === '/' ? '#008000' : ''}`,
            cursor: `${location.pathname === '/' ? 'default' : ''}`,
          }}
        >
          <p>Listar</p>
        </div>
        <div
          className="options"
          onClick={() => history.push('/register')}
          style={{
            backgroundColor: `${
              location.pathname === '/register' ? '#008000' : ''
            }`,
            cursor: `${location.pathname === '/register' ? 'default' : ''}`,
          }}
        >
          <p>Cadastrar</p>
        </div>
      </nav>
      <div className="handler-component">{children}</div>
    </div>
  )
}

export default Dashboard
