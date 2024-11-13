import './style.categories.scss'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories } from './categoriesSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons'

function Categories() {

    const dispatch = useDispatch()
    const categories = useSelector(({ categories: {categories} }) => categories)
    const status = useSelector(({categories}) => categories.status)
    const error = useSelector(({categories}) => categories.error)   

    useEffect(() => {
        if (status === 'idle') {
          dispatch(fetchCategories())
        }
      }, [status, dispatch])

  return (<>
        <Link to='..' className='link-back'>
          <FontAwesomeIcon icon={faHandPointLeft} className='icon-back'/>
        </Link>
    <div className='conteiner-categories'>
      {status === 'loading' && <h2 className='loading'>Loading...</h2>}
      {status === 'failed' && <p className='error'>Error {error}</p>}
      {status === 'succeeded' && categories.map(({ name, slug}, index)=>{
        return <Link to={'/categories/' + slug} key={index} className='categorie'>
          <h2>{name}</h2>
          <div>
            <img src={'/' + slug + '.png'} alt="" />
          </div>
        </Link>
      })}
    </div>
  </>)
}

export default Categories