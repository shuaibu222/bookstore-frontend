'use client'

import React, { useState } from 'react'

export default function page() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [authorName, setAuthorName] = useState("")
    const [authorBio, setAuthorBio] = useState("")
    const [publishDate, setPublishDate] = useState("")
    const [genre, setGenre] = useState("")
    const [visibility, setVisibility] = useState("")
    const [uploadedBook, setUploadedBook] = useState(null)
    const [uploadedCoverImage, setUploadedCoverImage] = useState(null)

    const handleBook = (e) => {
        const selectedFile = e.target.files[0]["name"];
        setUploadedBook(selectedFile);
        console.log(selectedFile);
      };

      const handleCover = (e) => {
        const selectedFile = e.target.files[0]["name"];
        setUploadedCoverImage(selectedFile);
        console.log(selectedFile);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (title && desc && authorName && authorBio && publishDate && genre && visibility && uploadedBook && uploadedCoverImage) {
          const formData = {
            "title": title,
            "description": desc,
            "author_name": authorName,
            "author_bio": authorBio,
            "publish_date": publishDate,
            "genre": genre,
            "privacy": visibility,
            "uploaded_book": uploadedBook,
            "uploaded_cover_image": uploadedCoverImage
          }
    
          try {
            const response = await fetch('http://localhost:9000/v1/api/books', {
              method: "POST",
              body: JSON.stringify(formData),
              headers: {
              "Content-Type": "application/x-www-form-urlencoded"
          }
            });
    
            if (response.ok) {
              console.log('Book created successfully.');
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
          <fieldset>
            <label htmlFor="book-url">Upload Book: </label>
            <input
              type="file"
              onChange={handleBook}
              name="file"
              id="book-url"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="cover-url">Upload Cover Image: </label>
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
