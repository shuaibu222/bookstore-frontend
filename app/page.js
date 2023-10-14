'use client'

import { useState } from "react"


export default function Home() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && password) {

      try {
        const response = await fetch('http://localhost:9000/v1/api/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: JSON.stringify({
            username,
            password
        }),
          credentials: 'include',
        });

        if (response.ok) {
          const responseData = await response.json(); // Await the promise
          console.log('Logged in successfully!', responseData);
        } else {
          console.error('Failed to login.', response.statusText);
        }
      } catch (error) {
        console.error('Error while logging:', error);
      }
    }
  };



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
          <button type='submit' onClick={handleSubmit}>submit</button>
          </form>
    </main>
  )
}
