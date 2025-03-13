import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>


    <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg' />
        <div>
            <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Powered Text to Image Generator</h2>
            <p className='text-gray-600'>Turn simple words into breathtaking AI-generated art and photos in seconds. Unleash your creativity and watch as your imagination transforms into stunning visuals with just a few clicks. Whether it's dreamy landscapes, futuristic portraits, or abstract designs, let AI bring your ideas to life like never before. Create, explore, and inspire effortlessly!
            </p>
            <br />
            <p className='text-gray-600'> Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. Whether you envision a futuristic city, a magical fantasy world, or a realistic portrait, our AI turns your ideas into stunning visuals with incredible detail. No artistic skills are needed—just your imagination! Experience the power of AI-driven creativity and bring your visions to life effortlessly with our advanced image-generation technology.</p>
        </div>
    </div>
    </div>
  )
}

export default Description
