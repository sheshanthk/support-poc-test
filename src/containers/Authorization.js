import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Keycloak from 'keycloak-js'
import { useDispatch , useSelector} from 'react-redux'
import { authenticate } from '../store/reducers/authReducer'

function Authorization(props) {

  const dispatch = useDispatch()
  const { authenticated } = useSelector(state => state.authReducer)
  const realm = sessionStorage.getItem('realm')

  useEffect(() => {
    if (!realm) {
      props.history.push('/login')
    } 
    if (realm && !authenticated) {
      const keycloakConfig = {
        "url": process.env.REACT_APP_URL,
        "ssl-required": process.env.REACT_APP_ssl_required,
        "clientId": process.env.REACT_APP_clientId,
        "public-client": Boolean(process.env.REACT_APP_public_client),
        "confidential-port": Number(process.env.REACT_APP_confidential_port),
        "realm": realm
      }
      const keycloak = Keycloak(keycloakConfig)
      keycloak.init({ 'onLoad': 'login-required' })
        .then(authenticated => {
          dispatch({ type: authenticate, payload: { authenticated, keycloak } })
        })
    }
  }, [authenticated, props.history, dispatch, realm])

  return (
    authenticated && (<div className="Authorization">
      { props.children }
    </div>)
  )
}

export default withRouter(Authorization)
