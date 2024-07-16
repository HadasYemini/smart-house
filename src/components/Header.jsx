import React from 'react'
import { Link } from 'react-router-dom'
import homeIcon from './../assets/home.svg'

export default function Header(onSave) {
  return (
    <>
      <div className='flex items-center w-full my-5 border-b-4 pb-2 border-indigo-500' >
        <Link to={'/'} style={{ cursor: 'pointer' }} className='w-10 ml-5'>
          <img src={homeIcon} className="icon" />
        </Link>
        <h1 className='w-10/12'>Smart house</h1>
      </div>
    </>
  )
}
