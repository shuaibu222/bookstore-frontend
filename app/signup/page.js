'use client'

import React, { useState } from 'react'

export default function page() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState("")
    const [uploadedProfileImage, setUploadedProfileImage] = useState(null)

      const handleCover = (e) => {
        const selectedFile = e.target.files[0]["name"];
        setUploadedProfileImage(selectedFile);
        console.log(selectedFile);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (username && email && fullName && password && bio && uploadedProfileImage) {
          const formData = {
            "username": username,
            "email": email,
            "full_name": fullName,
            "password": password,
            "bio": bio,
            "uploaded_profile_image": uploadedProfileImage
          }

    
          try {
            const response = await fetch('http://localhost:9000/v1/api/users', {
              method: "POST",
              body: JSON.stringify(formData),
              headers: {
              "Content-Type": "application/x-www-form-urlencoded"
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
    <section>
        <form className="flex flex-col gap-4" >
          <fieldset>
            <label htmlFor="title">Username: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="text"
              id="title"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="title">email: </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="text"
              id="title"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="link">Full Name: </label>
            <input
              type="text"
              name="text"
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="link">Password: </label>
            <input
              type="text"
              name="text"
              id="link"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="link">Bio: </label>
            <input
              type="text"
              name="text"
              id="link"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="cover-url">Upload Profile Image: </label>
            <input
              type="file"
              onChange={handleCover}
              name="file"
              id="cover-url"
            />
          </fieldset>
          <button type='submit' onClick={handleSubmit}>submit</button>
        </form>
    </section>
  )
}
