import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const {user, setShowLogin} = useContext(AppContext)
    const navigate =useNavigate()

    const onClickHandler = () => {
        if(user){
            navigate('/result')
        } else {
            setShowLogin(true)
        }

    }
    return (
        <motion.div className='flex flex-col justify-center items-center text-center my-20'
        initial={{opacity:0.2, y:100}}transition={{duration:1}} whileInView={{opacity:1, y:0}} viewport={{once:true}} > 

            <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'
             initial={{opacity:0.2, y:-20}} animate={{opacity:1, y:0}}transition={{delay: 0.2, duration:1}} >
                <p>Text to image generator</p>
                <img src={assets.star_icon} alt="" />
            </motion.div>

            <motion.h1 className='text-4xl max-w-[300px] mt-10 sm:text-4xl sm:max-w-[590px] mx-auto text-center'> Turn text to <span className='text-blue-600'
            initial={{opacity:0}} animate={{opacity:1}}transition={{delay: 0.4, duration:2}}  >image</span> in seconds. </motion.h1>
            <p className='text-center max-w-xl max-auto mt-5'> Unleash your creativity with AI. Turn your imagination into visual art into seconds - just type, and watch the magic happen</p>

            <button onClick={onClickHandler} className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'>
                Generate Images
                <img className='h-6' src={assets.star_group} alt="" />
            </button>

            <div className='flex flex-wrap justify-center mt-16 gap-3'>
                {Array(6).fill('').map((item, index) => (
                    <img className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
                        src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
                        alt="" key={index} width={70} />
                ))}

            </div>
            <p className='mt-2 text-neutral-600'> Generated images from Promptopia</p>
        </motion.div>
    )
}

export default Header
