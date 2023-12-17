import "./form.style.scss"
import { Formik } from 'formik'
import { schema } from "../schema"
import { useDispatch } from "react-redux" 
import {changeName} from '../redux/userNameSlice'

function Form() {

const dispatch = useDispatch()

const initialValuse = {
    name: "",
    surname: "",
    age: "",
    password: "",
    email: ""
}

function mySubmitForm(values, {resetForm, setSubmitting}){
  setTimeout(()=>{
setSubmitting(false)
  },2000)
      resetForm()
setSubmitting(true)  
dispatch(changeName(values.name))
}

   return (<>
  <Formik validationSchema={schema} initialValues={initialValuse} onSubmit={mySubmitForm}>
    {({errors, touched, values, isSubmitting, handleChange, handleSubmit, handleBlur})=>{
        return <form onSubmit={handleSubmit}>
<div className="input-div">
    <input className={errors.name && touched.name? "err" : ""} onBlur={handleBlur} onChange={handleChange} value={values.name} type="name" name="name" placeholder="name"/>
{errors.name && touched.name && <span>{errors.name}</span>}
</div>
<div className="input-div">
    <input className={errors.surname && touched.surname? "err" : ""} onBlur={handleBlur} onChange={handleChange} value={values.surname} type="surname" name="surname" placeholder="surname"/>
{errors.surname && touched.surname && <span>{errors.surname}</span>}
</div>
<div className="input-div">
    <input className={errors.age && touched.age? "err" : ""} onBlur={handleBlur} onChange={handleChange} value={values.age} type="number" name="age" placeholder="age"/>
{errors.age && touched.age && <span>{errors.age}</span>}
</div>
<div className="input-div">
    <input className={errors.password && touched.password? "err" : ""} onBlur={handleBlur} onChange={handleChange} value={values.password} autoComplete="off" type="password" name="password" placeholder="password"/>
{errors.password && touched.password && <span>{errors.password}</span>}
</div>
<div className="input-div">
    <input className={errors.email && touched.email? "err" : ""} onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" name="email" placeholder="email"/>
{errors.email && touched.email && <span>{errors.email}</span>}
</div>
    <input disabled={!!Object.keys(errors).length || isSubmitting} type="submit" value="Go for it !" />
   </form>
    }}
  </Formik>

  </>)
}

export default Form