'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function page() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [authorName, setAuthorName] = useState("")
    const [authorBio, setAuthorBio] = useState("")
    const [publishDate, setPublishDate] = useState("")
    const [genre, setGenre] = useState("")
    const [visibility, setVisibility] = useState("")

    
      const handleSubmit = async (e) => {
        e.preventDefault();

        const router = useRouter()
    
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
    <section>
        <form className="flex flex-col gap-4" >
          <fieldset>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="text"
              id="title"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="title">desc: </label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              name="text"
              id="title"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="link">Author Name: </label>
            <input
              type="text"
              name="text"
              id="name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="link">Bio: </label>
            <input
              type="text"
              name="text"
              id="link"
              value={authorBio}
              onChange={(e) => setAuthorBio(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="link">Publish Date: </label>
            <input
              type="text"
              name="text"
              id="link"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="link">Genre: </label>
            <select
              name="category"
              id="category"
              className="category"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="default">select genre</option>
              <option value="technology">technology</option>
              <option value="data structures">data structures</option>
              <option value="AI">AI</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="link">Visibility: </label>
            <select
              name="category"
              id="category"
              className="category"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="default">select category</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </fieldset>
          <button type='submit' onClick={handleSubmit}>submit</button>
        </form>
    </section>
  )
}
