'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    console.log('toggleMenu');
    setIsOpen(!isOpen);
  }

  return (
    <header className='w-full absolute z-10'>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">BibleApi</span>
        </div>
        <div className="block sm:hidden">
          <div onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" /></svg>
          </div>
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} w-full block flex-grow sm:flex sm:items-center sm:w-auto`}>
          <div className="text-sm sm:flex-grow">
            <Link href="/form" className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
              Form
            </Link>
            <Link href="/view-data" className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
              View Data
            </Link>
            <Link href="/" className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white mr-4">
              Home
            </Link>
            <Link href="/contact" className="block mt-4 sm:inline-block sm:mt-0 text-teal-200 hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
};

export default NavBar;
