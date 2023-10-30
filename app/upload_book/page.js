'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAppContext } from '../components/States'

export default function page() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [authorName, setAuthorName] = useState("")
    const [authorBio, setAuthorBio] = useState("")
    const [publishDate, setPublishDate] = useState("")
    const [genre, setGenre] = useState("")
    const [visibility, setVisibility] = useState("")

    const {isAuthenticated} = useAppContext()
    const router = useRouter()
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        if (title && desc && authorName && authorBio && publishDate && genre && visibility) {
          const formData = {
            "title": title,
            "description": desc,
            "author_name": authorName,
            "author_bio": authorBio,
            "publish_date": publishDate,
            "genre": genre,
            "privacy": visibility,
          }

          const token = localStorage.getItem("token");
    
          try {
            const response = await fetch('http://localhost:8000/v1/api/books', {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
              "Cookie": `${token}`,
              },
              body: JSON.stringify(formData),
              credentials: "include"
            });
    
            if (response.ok) {
              console.log('Book created successfully.');
              router.push("/books")
            } else {
              console.error('Failed to create book.');
            }
          } catch (error) {
            console.error('Error creating book:', error);
          }
        }
      };


  return (
    <div className='flex flex-col mt-8'>
    {isAuthenticated ? <section className='flex min-h-screen flex-col items-center p-24 max-w-7xl mx-auto my-0 gap-9'>
        <h1 className='text-4xl'>Upload Book</h1>
        <form className="flex flex-col gap-4" >
          <fieldset className='grid border-none gap-2'>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="text"
              id="title"
            />
          </fieldset>
          <fieldset className='grid border-none gap-2'>
            <label htmlFor="title">desc: </label>
            <input
              type="text"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              name="text"
              id="title"
            />
          </fieldset>
          <fieldset className='grid border-none gap-2'>
            <label htmlFor="link">Author Name: </label>
            <input
              type="text"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
              name="text"
              id="name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </fieldset>
          <fieldset className='grid border-none gap-2'>
            <label htmlFor="link">Bio: </label>
            <input
              type="text"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
              name="text"
              id="link"
              value={authorBio}
              onChange={(e) => setAuthorBio(e.target.value)}
            />
          </fieldset>
          <fieldset className='grid border-none gap-2'>
            <label htmlFor="link">Publish Date: </label>
            <input
              type="text"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
              name="text"
              id="link"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
            />
          </fieldset>
          <fieldset className='grid border-none gap-2'>
            <label htmlFor="link">Genre: </label>
            <select
              name="category"
              id="category"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="default">select genre</option>
              <option value="technology">technology</option>
              <option value="data structures">data structures</option>
              <option value="AI">AI</option>
            </select>
          </fieldset>
          <fieldset className='grid border-none gap-2'>
            <label htmlFor="link">Visibility: </label>
            <select
              name="category"
              id="category"
              className='w-full p-3 bg-black outline-none border-white border-2 rounded-md'
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="default">select category</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </fieldset>
        </form>
        <button type='submit' className='border-none p-3 bg-orange-500 cursor-pointer rounded-md' onClick={handleSubmit}>create book</button>
    </section> : <h1 className='text-4xl self-center'>401 Unauthorized!</h1> }
    </div>
  )
}
