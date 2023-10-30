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
    <main className="flex flex-col gap-3 mt-8">
      {bookIsNull && isAuthenticated ? books.map((book) => {
        return (
          <div key={book._id} className="px-5 py-4 flex justify-between h-24 border-white border-2 rounded-lg hover:bg-orange-500 hover:transition-all hover:duration-100 hover:ease-in-out cursor-pointer hover:text-white">
            <div className="flex flex-col justify-between">
              <h1>{book.title}</h1>
              <p>{book.author_name}</p>
            </div>
            <div>
              <button className="px-3 py-1 border-black border-2 bg-red-500 rounded-md" onClick={() => handleDelete(book._id)}>delete</button>
            </div>
          </div>
        )
      }) : <h1 className="text-4xl self-center">No book uploaded yet, or not authorized.</h1>}
    </main>
  )
}
