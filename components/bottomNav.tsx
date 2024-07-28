import { IoHomeOutline, IoWalletOutline, IoAddCircleOutline, IoCartOutline, IoMenu } from "react-icons/io5";
import React from 'react'

const BottomNav = () => {
  return (
    <div className='md:hidden flex justify-between items-center fixed bottom-0 w-full h-[70px] bg-white px-6'>
        <IoHomeOutline size={25} className="cursor-pointer"/>
        <IoWalletOutline size={25} className="cursor-pointer" />
        <IoAddCircleOutline size={25} className="cursor-pointer"/>
        <IoCartOutline size={25} className="cursor-pointer"/>
        <IoMenu size={25} className="cursor-pointer"/>
    </div>
  )
}

export default BottomNav