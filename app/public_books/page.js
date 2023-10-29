'use client'

import React, {useState, useEffect} from "react";


export default function page() {
  const [books, setBooks] = useState([]);
  const [bookIsNull, setBookIsNull] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch("http://localhost:8000/v1/api/public/books", {
        method: "GET",
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        if (data === null){
          setBookIsNull(false)
          console.log("No books for this user");
        }else {
          setBooks(data);
        }
        
      } else {
        console.error("Error fetching books");
      }
    };
  
    fetchBooks();
  }, []);
  

  return (
    <main>
      {bookIsNull ? books.map((book) => {
        return (
          <div key={book._id}>
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <p>{book.publish_date}</p>
          </div>
        )
      }) : <h1>No book uploaded yet.</h1>}
    </main>
  )
}
