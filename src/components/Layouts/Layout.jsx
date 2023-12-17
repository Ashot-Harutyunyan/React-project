import "./layout.style.scss"
import { NavLink, Outlet } from "react-router-dom"
import { useSelector } from "react-redux" 
const Layout = () => {

const {value} = useSelector(({userName})=>userName)    

  return (
<>
    <header>
        
 <div className="formlink">    
 <h2 className="userName">{value}</h2>
<NavLink style={{fontSize: "20px"}} className={({isActive})=>{
    if(isActive) return "link-active"
        return "form-active"
}} to="/form">Register on this site</NavLink>
</div> 

        <nav>
            <NavLink className={({isActive})=> {
                if(isActive) return "link-active"
                return ""
            }} to="/">Products</NavLink>
            <NavLink className={({isActive})=> {
                if(isActive) return "link-active"
                return ""
            }} to="/about">About</NavLink>
            <NavLink className={({isActive})=> {
                if(isActive) return "link-active"
                return ""
            }} to="/contacts">Contacts</NavLink>
            <NavLink className={({isActive})=> {
                if(isActive) return "link-active"
                return ""
            }} to="/partners">Partners</NavLink>

        </nav>
    </header>
    <main>
        <Outlet/>
    </main>
    <footer></footer>
    </>
  )
}

export default Layout