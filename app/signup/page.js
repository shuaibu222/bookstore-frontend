'use client'

import React, { useState } from 'react'

export default function page() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState("")


    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (username && email && fullName && password && bio) {
          const formData = {
            "username": username,
            "email": email,
            "full_name": fullName,
            "password": password,
            "bio": bio,
          }

    
          try {
            const response = await fetch('http://localhost:8000/v1/api/users', {
              method: "POST",
              body: JSON.stringify(formData),
              headers: {
              "Content-Type": "application/json"
          }
            });
    
            if (response.ok) {
              console.log('User created successfully.');
              // Handle the response as needed.
            } else {
              console.error('Failed to create book.');
            }
          } catch (error) {
            console.error('Error creating book:', error);
          }
        }
      };


  return (
    <section className='flex min-h-screen flex-col items-center p-24 max-w-7xl mx-auto my-0 gap-9'>
        <h1 className='text-4xl'>Signup</h1>
        <form className="grid place-content-center gap-4" >
          <fieldset className='grid border-none gap-2'>
            <label htmlFor="title">username: </label>
            <input
              type="text"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="text"
              id="title"
            />
          </fieldset>
          <fieldset className='grid border-none gap-2'>
            <label htmlFor="title">email: </label>
            <input
              type="text"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="text"
              id="title"
            />
          </fieldset>
          <fieldset className='grid border-none gap-2'>
            <label htmlFor="link">fullname: </label>
            <input
              type="text"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
              name="text"
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </fieldset>
          <fieldset className='grid border-none gap-2'>
            <label htmlFor="link">password: </label>
            <input
              type="text"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
              name="text"
              id="link"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <fieldset className='grid border-none gap-2'>
            <label htmlFor="link">bio: </label>
            <input
              type="text"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
              name="text"
              id="link"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>
        </form>
        <button type='submit' className='border-none p-3 bg-orange-500 cursor-pointer rounded-md' onClick={handleSubmit}>submit</button>
    </section>
  )
}
