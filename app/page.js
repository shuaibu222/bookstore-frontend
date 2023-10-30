'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from './components/States'


export default function Home() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const {setIsAuthenticated} = useAppContext()
  const router = useRouter()

  const handleLogin = async (e) => {

    // const jwtToken = localStorage.getItem('token');
  
      // // Calculate the time until token expiration
      // const tokenExpirationTime = decodeJwt(jwtToken).exp * 50000; // Convert to milliseconds
      // const currentTime = new Date().getTime();
  
      // if (tokenExpirationTime - currentTime < 30000) {
      //   // Token is close to expiration (30 seconds remaining), refresh it
      //   const refreshToken = localStorage.getItem('refreshToken');
  
      //   if (refreshToken) {
      //     // Send a request to your refresh token endpoint to get a new JWT token
      //     const response = await fetch('http://localhost:8000/v1/api/refresh-token', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ refreshToken }),
      //     });
  
      //     if (response.ok) {
      //       const data = await response.json();
      //       localStorage.setItem('token', data.newJwtToken);
      //     } else {
      //       console.error('Error refreshing token');
      //     }
      //   } else {
      //     console.log("refresh token is not yet available");
      //   }
      // }
      
    e.preventDefault();
    try {
    const response = await fetch('http://localhost:8000/v1/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: "include"
    });

    const data = await response.json();
    

    if (response.status === 200) {
      localStorage.setItem("token", data.token)
      router.push('/books');
      setIsAuthenticated(true)
  
    }
  } catch (error) {
    console.error(error);
  }};


  return (
    <main className="flex min-h-screen flex-col p-24 max-w-7xl mx-auto my-0 gap-9">
      <h1 className='text-4xl self-center'>Login</h1>
      <form className="grid place-content-center gap-4">
          <fieldset className='grid border-none gap-2'>
            <label htmlFor="username">username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="text"
              id="username"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
            />
          </fieldset>
          <fieldset className='grid border-none gap-2' >
            <label htmlFor="password">password: </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="text"
              id="password"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
            />
          </fieldset>
        </form>
        <button type='submit' className='border-none p-3 bg-orange-500 cursor-pointer rounded-md self-center' onClick={handleLogin}>Login</button>
    </main>
  )
}
