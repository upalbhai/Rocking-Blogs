import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col' >
            <h2 className='text-2xl'>Want to Know about Football</h2>
            <p className='text-gray-500 my-2'>Stay updated with the latest sports news on ESPN</p>
        </div>
        <div className='p-7 flex-1'>
            <img src="https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0530%2Fr1339451_1296x518_5%2D2.jpg" alt="" />
      </div>
      <Button className='rounded-tl-xl rounded-bl-none rounded-tr-none' gradientDuoTone='purpleToPink' >
        <a href="https://www.espn.in/" target='_blank' rel='noopener noreferer' >Stay Updated</a>
      </Button>
    </div>
  )
}
