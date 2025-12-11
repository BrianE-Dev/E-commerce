import React, {useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import {ShoppingCart} from 'lucide-react'
function NavMenu() {
  const {cartLength} = useContext(AppContext)
  return (
    <div className='flex justify-center items-center border-l-blue-500'>
        <ul className='flex flex-row justify-end items-center gap-8 text-blue-500 font-bold'>
            <li>Home</li>
            <li>About</li>
            <li>Products</li>
            <li className='flex'>
              <span className='bg-red-200 w-5 h-5 text-red-500 rounded-full text-xs flex items-center justify-center'>{cartLength}</span>
              <ShoppingCart />
              </li>
        </ul>
    </div>
  )
}

export default NavMenu