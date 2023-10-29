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
    
        const data = await response.json();
    
        if (response.status === 200) {
          console.log(data);
          localStorage.removeItem("token")
          router.push('/');
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error(error);
      }};
  return (
    <nav className='flex max-w-7xl place-content-center gap-6 mt-4'>
        <Link href={"/public_books"}>Public Books</Link>
        {isAuthenticated &&
        <Link href={"/books"}>Private Books</Link>}
        {isAuthenticated &&
        <Link href={"/upload_book"}>Upload Book</Link>}
        {!isAuthenticated &&
        <Link href={"/"}>Login</Link>}
        {!isAuthenticated &&
        <Link href={"/signup"}>Signup</Link>}
        {isAuthenticated &&
        <Link href={"/"} onClick={handleLogout}>Logout</Link>}
    </nav>
  )
}
