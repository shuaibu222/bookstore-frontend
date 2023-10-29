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
      console.log(localStorage.setItem("token", data.token))
      router.push('/books');
      setIsAuthenticated(true)
  
    }
  } catch (error) {
    console.error(error);
  }};




  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>This is a test form</h1>
      <form className="flex flex-col gap-4">
          <fieldset>
            <label htmlFor="username">username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="text"
              id="username"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">password: </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="text"
              id="password"
            />
          </fieldset>
          <button type='submit' onClick={handleLogin}>Login</button>
          </form>
    </main>
  )
}
