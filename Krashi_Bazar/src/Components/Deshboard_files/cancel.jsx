import React from 'react'
import { Link } from 'react-router-dom'

const cancel = () => {
  return (
    <div style={{display:'flex',textAlign:'center',alignItems:'center', justifyContent:'center',width:'500px', backgroundColor:'grey'}}>
    <div>
      Your Transaction Has been Failed, Please Try again.
    </div>
    <div>
      <Link to='/'>Go back</Link>
    </div>
</div>
  )
}

export default cancel