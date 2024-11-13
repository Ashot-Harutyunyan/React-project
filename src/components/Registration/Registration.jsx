import './style.registration.scss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Field } from 'formik'
import { getValidationSchema } from '../../schema'
import { registration } from '../../Layout/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faUser, faLock, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

const initialValues = {
  name: '',
  password: '',
  email: '',
  phone: '',
  gender: ''
}

function Registration({handleRegistrationForm}) {

  const user = useSelector(({ user }) => user.users)
  const dispatch = useDispatch()

  const schema = getValidationSchema(user)

  function mySubmitForm(values, {resetForm}){
    dispatch(registration((values)))
    resetForm()
    handleRegistrationForm(false)
  }

  return (<>
  <div className='Registration-div'>
    <div className='Registration-close' onClick={()=>handleRegistrationForm(false)}>
      <FontAwesomeIcon icon={faXmark} className='icon-close' />
    </div>
      <h2>Sign Up</h2>

      <Formik 
        initialValues={initialValues} 
        validationSchema={schema}
        onSubmit={mySubmitForm}
      >
        {({values, errors, touched, handleChange, handleSubmit, handleBlur})=> {          
        return <form className='Registration-form' onSubmit={handleSubmit}>

            <div className={errors.name && touched.name ? 'Registration-form-input-div err' : 'Registration-form-input-div'}>
              <div className='Registration-conteiner-icon'>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input
                onBlur={handleBlur}
                type="text"
                name="name"
                placeholder='Name'
                value={values.name}
                onChange={handleChange}
              />
            </div> 
              {errors.name && touched.name && <p className='input-error-message'>{errors.name}</p>}

            <div className={errors.password && touched.password ? 'Registration-form-input-div err' : 'Registration-form-input-div'}>
              <div className='Registration-conteiner-icon'>
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input 
                onBlur={handleBlur}
                type="password" 
                name="password"
                placeholder='Password'
                value={values.password}
                onChange={handleChange} 
              />
            </div>
              {errors.password && touched.password && <p className='input-error-message'>{errors.password}</p>}

            <div className={errors.email && touched.email ? 'Registration-form-input-div err' : 'Registration-form-input-div'}>
              <div className='Registration-conteiner-icon'>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <input 
                onBlur={handleBlur}
                type="email"
                name="email"
                placeholder='Email'
                value={values.email}
                onChange={handleChange} 
              />
            </div>
              {errors.email && touched.email && <p className='input-error-message'>{errors.email}</p>}

            <div className={errors.phone && touched.phone ? 'Registration-form-input-div err' : 'Registration-form-input-div'}>
              <div className='Registration-conteiner-icon'>
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <input 
                onBlur={handleBlur}
                type="text"
                name='phone'
                placeholder='Phone'
                value={values.phone}
                onChange={handleChange}
              />
            </div>
              {errors.phone && touched.phone && <p className='input-error-message'>{errors.phone}</p>}

           <div className='gender'>
              <div>
                <p>men</p>
                <Field 
                  style={{border: errors.gender && touched.gender ? '2px solid  #dc143c' : '2px solid  #213547'}}
                  onBlur={handleBlur}
                  type="radio" 
                  name="gender" 
                  value="men" 
                />
              </div>

              <div  >
                <p>woman</p>
                <Field 
                  style={{border: errors.gender && touched.gender ? '2px solid  #dc143c' : '2px solid  #213547'}}
                  onBlur={handleBlur}
                  type="radio" 
                  name="gender" 
                  value="woman" 
                />
              </div>
           </div>
      
          <input type="submit" value="Submit" />
      </form>
    }}
    </Formik>
  </div>
  </>)
}

export default Registration