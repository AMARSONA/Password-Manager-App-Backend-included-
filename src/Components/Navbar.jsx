import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className="mycontainer flex justify-between items-center py-5 px-4 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-500'>&lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="">Home</a>
                <a className='hover:font-bold' href="">About Us</a>
                <a className='hover:font-bold' href="">Contact Us</a>
               
            </li>
            
        </ul> */}
        <button className="logo text-white bg-green-700 my-5 mx-2 rounded-full flex justify-between items-center cursor-pointer ring-1 ring-white">
          <img className='invert p-1 w-10' src="icons/github-logo.svg" alt="" />
          <a href="https://github.com/AMARSONA" target='blank'><span className='font-bold px-2'>GitHub</span></a>
        </button>
      </div>

    </nav>
  )
}

export default Navbar
