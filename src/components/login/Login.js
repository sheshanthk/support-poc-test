import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

function Login(props) {
  
  const { errors, register, handleSubmit } = useForm()
  const { authenticated } = useSelector(state => state.authReducer)
  const dispatch = useDispatch();

  const handleLogin = ({ email }) => {
    const allRealms = process.env.REACT_APP_ALL_REALMS
    const availableRealms = allRealms && allRealms.split(',')
    const userDomain = email.split('@')
    const realm = userDomain[1] && userDomain[1].split('.')[0]
    if(realm && (availableRealms.indexOf(realm) >= 0) ) {
        sessionStorage.setItem('realm', realm)
        dispatch({ type: 'realm', payload: { realm } })
        props.history.push('/dashboard')
      } else {
        console.error('realm not allowed')
      }
  }
  

  useEffect(() => {
    const realm = sessionStorage.getItem('realm')
    if(realm){
      props.history.push('/dashboard')
    }
  }, [authenticated, props.history])

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="email">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" ref={register({ required: true })} />
          {errors.email && <div>"Email required"</div>}
        </div>
        <div className="login">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login;
