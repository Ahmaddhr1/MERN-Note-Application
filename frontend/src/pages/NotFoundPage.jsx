import React from 'react'
import NotFound from '../../imgs/404.png'
import { Link } from 'react-router-dom'
const NotFoundPage = () => {
  return (
    <div className='loginContainer'>
         <h1  className='text-2xl'>Ooppsss !! Page Not Found </h1>
        <img src={NotFound} alt="not found" className='w-[260px]'/>
        <Link className='center py-4 px-2 w-[200px]  rounded-md bg-gray-100' to={'/'}>Go Home</Link>
    </div>
  )
}

export default NotFoundPage