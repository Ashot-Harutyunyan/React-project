import {memo} from 'react'

function AboutCover() {
    const telephone = ["1.png", "2.png", "3.png", "4.png", "1.png"]
  return (<>
     <div className='telephoneDiv'>
  {telephone.map((elem)=>{
    return <img className='telephone' key={Math.random()} src={"./telephone/" + elem} alt="" />
  })}
  </div>
  </>)
}

export default memo(AboutCover)