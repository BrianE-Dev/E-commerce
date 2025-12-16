import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';


function SectionHeader() {
  const {monthlyAllowee, cartLength} = useContext(AppContext)
  
  return (
    <h1 className="text-yellow-500 text-xl font-sans hover:text-2xl hover:text-red-400 font-extrabold underline decoration-green-400">
      <p>Welcome Brian, you have you have {cartLength} item(s) in cart.</p>
    </h1>
  );
}

export default SectionHeader;
