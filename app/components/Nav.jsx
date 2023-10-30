'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useAppContext } from './States';

export default function Nav() {
    const router = useRouter()
    const {setIsAuthenticated, isAuthenticated} = useAppContext()


    const handleLogout = async (e) => {
        e.preventDefault();

        try {
        const response = await fetch('http://localhost:8000/v1/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include"
        });
    
        if (response.status === 200) {
          localStorage.removeItem("token")
          router.push('/');
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error(error);
      }};
  return (
    <nav className='flex max-w-7xl mx-auto mb-0 place-content-center gap-5 mt-4'>
        <Link href={"/public_books"} className='border-b-2 text-sm border-b-transparent px-1 py-3 hover:border-orange-500 hover:text-orange-500 hover:transition-all hover:duration-150 hover:ease-in-out'>Public Books</Link>
        {isAuthenticated &&
        <Link href={"/books"} className='border-b-2 text-sm border-b-transparent px-1 py-3 hover:border-orange-500 hover:text-orange-500 hover:transition-all hover:duration-150 hover:ease-in-out'>Private Books</Link>}
        {isAuthenticated &&
        <Link href={"/upload_book"} className='border-b-2 text-sm border-b-transparent px-1 py-3 hover:border-orange-500 hover:text-orange-500 hover:transition-all hover:duration-150 hover:ease-in-out'>Upload Book</Link>}
        {!isAuthenticated &&
        <Link href={"/"} className='border-b-2 text-sm border-b-transparent px-1 py-3 hover:border-orange-500 hover:text-orange-500 hover:transition-all hover:duration-150 hover:ease-in-out'>Login</Link>}
        {!isAuthenticated &&
        <Link href={"/signup"} className='border-b-2 text-sm border-b-transparent px-1 py-3 hover:border-orange-500 hover:text-orange-500 hover:transition-all hover:duration-150 hover:ease-in-out'>Signup</Link>}
        {isAuthenticated &&
        <Link href={"/"} onClick={handleLogout} className='border-b-2 text-sm border-b-transparent px-1 py-3 hover:border-orange-500 hover:text-orange-500 hover:transition-all hover:duration-150 hover:ease-in-out'>Logout</Link>}
    </nav>
  )
}
