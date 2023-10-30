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
    <main className="flex flex-col gap-3 mt-8">
      {bookIsNull  ? books.map((book) => {
        return (
          <div key={book._id} className="px-5 py-4 flex flex-col justify-between h-24 border-white border-2 rounded-lg hover:bg-orange-500 hover:transition-all hover:duration-100 hover:ease-in-out cursor-pointer hover:text-white">
              <h1>{book.title}</h1>
              <p>{book.author_name}</p>
          </div>
        )
      }) : <h1 className="text-4xl">No book uploaded yet, or not authorized.</h1>}
    </main>
  )
}
