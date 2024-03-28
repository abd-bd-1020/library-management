import { ServerConfig } from "../config/ServerConfig";
import { ClientEnum } from "../ClientEnum";
import axios from "axios";
import DefaultService from "./DefaultService";
import uuid from "react-uuid";

export default class BookService {
  static instance = BookService.instance || new BookService();

  getUserByEmail(email) {
    const storedUserDataString = localStorage.getItem("userData");
    const userDataArr = JSON.parse(storedUserDataString);
    var userData = null;
    userDataArr.forEach((user) => {
      if (user.email === email) {
        userData = user;
      }
    });
    return userData;
  }

  async createBook(payload) {
    let retry = 0;

    // authors is a comma-separated string convert it to an array
    const bookData = {
      _id: uuid(),
      title: payload.title,
      authors: payload.authors.split(","),
      rating: payload.rating,
      genre: payload.genre,
      thumbnailUrl:
        "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/jones6.jpg",
      longDescription:
        '3D User Interfaces with Java 3D is a practical guide for providing next-generation applications with 3D user interfaces for manipulation of in-scene objects. Emphasis is on standalone and web-based business applications, such as for online sales and mass customization, but much of what this book offers has broad applicability to 3D user interfaces in other pursuits such as scientific visualization and gaming.  This book provides an extensive conceptual framework for 3D user interface techniques, and an in-depth introduction to user interface support in the Java 3D API, including such topics as picking, collision, and drag-and-drop. Many of the techniques are demonstrated in a Java 3D software framework included with the book, which also provides developers with many general-purpose building blocks for constructing their own user interfaces.    Applications and their use of 3D are approached realistically. The book is geared towards sophisticated user interfaces for the "everyday user" who doesn\'t have a lot of time to learn another application--much less a complicated one--and an everyday computer system without exotic devices like head mounted displays and data gloves. Perhaps the best description of this book is: "A roadmap from Java 3D to \'Swing 3D\'."',
    };

    while (retry++ < 2) {
      try {
        const allBooksJSON = localStorage.getItem("bookData");
        const allBooks = JSON.parse(allBooksJSON);
        allBooks.push(bookData);
        localStorage.setItem("bookData", JSON.stringify(allBooks));
        return {
          status: true,
          data: "success",
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async deleteBook(payload) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allBooksJSON = localStorage.getItem("bookData");
        const allBooks = JSON.parse(allBooksJSON);
        const updatedBooks = allBooks.filter((book) => book._id !== payload.id);
        localStorage.setItem("bookData", JSON.stringify(updatedBooks));
        return {
          status: true,
          data: "success",
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
  async updateBook(payload) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allBooksJSON = localStorage.getItem("bookData");
        const allBooks = JSON.parse(allBooksJSON);
        const updatedBooks = allBooks.map((book) => {
          if (book._id === payload._id) {
            return {
              ...book,
              title: payload.title,
              authors: payload.authors.split(","),
              rating: payload.rating,
              genre: payload.genre,
            };
          }
          return book;
        });
        localStorage.setItem("bookData", JSON.stringify(updatedBooks));
        return {
          status: true,
          data: "success",
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
  async getAllbooks() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allBooksJSON = localStorage.getItem("bookData");
        const allBooks = JSON.parse(allBooksJSON);

        return {
          status: true,
          data: allBooks,
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
}
