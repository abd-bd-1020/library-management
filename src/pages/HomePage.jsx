import React from "react";
import Book from "../components/Book"; // Adjust the path as necessary
import booksData from "../data/books.json"; // Adjust the path to your books.json

export default function HomePage() {
  return (
    <div>
      {booksData.map((book) => (
        <Book key={book._id} book={book} />
      ))}
    </div>
  );
}
