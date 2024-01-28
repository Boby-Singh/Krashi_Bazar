import React from 'react'
import { Link } from 'react-router-dom'
import Orders from './orders'
const success = () => {


  return (
    <div>
      <h2>Payment Successful!</h2>
      <Orders/>
      <Link to='/'>Go Home</Link>
    </div>
  )
}

export default success