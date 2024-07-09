import React from 'react'
import appwriteservice from "../appwrite/mainconfig"
import { Link } from 'react-router-dom'

function Postcard({ $id, title, image }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4 h-80 flex flex-col justify-between'>
        <div className='w-full flex justify-center mb-4 h-2/3'>
          <img 
            src={appwriteservice.getFilePreview(image)} 
            alt={title} 
            className='rounded-xl object-cover h-full w-full' 
          />
        </div>
        <h2 className='text-xl font-bold text-center'>{title}</h2>
      </div>
    </Link>
  )
}

export default Postcard
