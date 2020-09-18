import React from 'react'
import { useSelector } from 'react-redux'

function Dashboard(props) {

  const { keycloak } = useSelector(state => state.authReducer)

  const handleLogout = () => {
    props.history.push('/login')
    sessionStorage.clear()
    keycloak.logout()
  }

  return ( 
    <div className="Dashboard">
      Dashboard
      <div className="logout">
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Dashboard
