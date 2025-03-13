import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
        <img src={assets.logo} alt="" width={40} />
        <p className='ml-55'> Copyright | All rights reserved.</p>
        <div className='flex gap-2.5 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>
            <img src={assets.facebook_icon} alt="" width={35} />
            <img src={assets.twitter_icon} alt="" width={35} />
            <img src={assets.instagram_icon} alt="" width={35} />
        </div>
      
    </div>
  )
}

export default Footer
