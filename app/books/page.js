'use client'

import React, {useState, useEffect} from "react";
import { useAppContext } from "../components/States";


export default function page() {
  const [books, setBooks] = useState([]);
  const [bookIsNull, setBookIsNull] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false)

  const {isAuthenticated} = useAppContext()

  const handleDelete = async (id) => {

    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      "Cookie": `${token}`,
    };

    const response = await fetch(`http://localhost:8000/v1/api/books/${id}`, {
      method: "DELETE",
      headers: headers,
      credentials: "include"
    });

    if (response.ok) {
      // const data = await response.json();
      setIsDeleted(true)
    } else {
      console.log("Error while deleting book");
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        "Cookie": `${token}`,
      };

      const response = await fetch("http://localhost:8000/v1/api/books", {
        method: "GET",
        headers: headers,
        credentials: "include"
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
  
    if (isAuthenticated) {
      fetchBooks();
    }
  }, [isDeleted]);
  

  return (
    <main>
      {bookIsNull && isAuthenticated ? books.map((book) => {
        return (
          <div key={book._id}>
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <p>{book.publish_date}</p>
            <button onClick={() => handleDelete(book._id)}>delete</button>
          </div>
        )
      }) : <h1>No book uploaded yet or You didn't login.</h1>}
    </main>
  )
}
