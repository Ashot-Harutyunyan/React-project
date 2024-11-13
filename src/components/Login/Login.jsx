import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../../Layout/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

function Login({handleLoginForm}) {

  const allUsers = useSelector(({ user }) => user.users)
  const dispatch = useDispatch()

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState([false, false])
 

  function handleSubmit(e) {
    e.preventDefault()
  
    const validate = Object.values(userLogin).every((val) => val)
  
    if (!validate) {
      setError([true, true])
      return
    }
  
    const user = allUsers.find((elem) => elem.email === userLogin.email)
  
    if (!user) {
      setError([true, false]) 
    } else if (user.password !== userLogin.password) {
      setError([false, true]) 
    } else {
      setError([false, false])
      dispatch(loginUser(userLogin))
  
      setUserLogin({
        username: '',
        password: '',
      });
  
      handleLoginForm(false)
      e.target.reset()
    }
  }
  

  function handleChange(e){
    const { name, value } = e.target 
    setUserLogin({...userLogin, [name]: value}) 
  }

  return (<>
      <div className='Registration-div'>
          <div className='Registration-close' onClick={()=>handleLoginForm(false)}>
            <FontAwesomeIcon icon={faXmark} className='icon-close'/>
          </div>
          <h2>Sign In</h2>
          <form className='Registration-form' onSubmit={handleSubmit}>

          <div className='Registration-form-input-div'>
            <div className='Registration-conteiner-icon'>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <input 
              type="email"
              name="email"
              placeholder='Email'
              value={userLogin.email}
              onChange={handleChange}
            />
          </div>

          <p className='input-error-message'
             style={{display: error[0] ? 'block' : 'none'}}>incorrect email address</p>

          <div className='Registration-form-input-div'>
            <div className='Registration-conteiner-icon'>
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input 
              type="password" 
              name="password"
              placeholder='Password'
              value={userLogin.password}
              onChange={handleChange}
            />
           </div>

           <p className='input-error-message'
              style={{display: error[1] ? 'block' : 'none'}}>wrong password</p>

            <input type="submit" value="Submit" />
          </form>
    </div>
  </>)
}

export default Login