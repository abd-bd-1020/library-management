import { ServerConfig } from "../config/ServerConfig";
import { ClientEnum } from "../ClientEnum";
import axios from "axios";
import DefaultService from "./DefaultService";
import uuid from "react-uuid";

export default class BorrowService {
  static instance = BorrowService.instance || new BorrowService();

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


  async requestBorrowBooks(payload) {
    console.log(payload)
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allBorrowDataJSON = localStorage.getItem("borrowData");
        const allBorrowData = JSON.parse(allBorrowDataJSON);

        for (let i = 0; i < payload.books.length; i++) {
          const singleBorrowBook = {
            "amount": payload.books[i].amount,
            "userEmail": payload.email,
            "bookId": payload.books[i]._id,
            "isBorrowed": false,
            "borrowId": uuid(),
            "requestTime": new Date()

          }
          allBorrowData.push(singleBorrowBook)
        }
        localStorage.setItem("borrowData", JSON.stringify(allBorrowData));
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

  async getBorrowedBookRequest(payload) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allBooksJSON = localStorage.getItem("bookData");
        const allBooks = JSON.parse(allBooksJSON);
        const allRequestedBooksJSON = localStorage.getItem("borrowData");
        const allRequestedBooks = JSON.parse(allRequestedBooksJSON);
        let requestedBooksOfSpecificPerson = []
        allRequestedBooks.forEach(requestedBook => {
          if (requestedBook.userEmail === payload.email && requestedBook.isBorrowed == false) {
            const bookId = requestedBook.bookId;
            const existingBook = allBooks.find(book => book._id === bookId);

            if (existingBook) {
              requestedBooksOfSpecificPerson = requestedBooksOfSpecificPerson.map(book => {
                if (book._id === bookId) {
                  book.amount += requestedBook.amount;
                }
                return book;
              });

              if (!requestedBooksOfSpecificPerson.some(book => book._id === bookId)) {
                requestedBooksOfSpecificPerson.push({ ...existingBook, "amount": requestedBook.amount });
              }
            }
          }
        });


        return {
          status: true,
          data: requestedBooksOfSpecificPerson,
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }



  async getAllBorrowRequests() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allBooksJSON = localStorage.getItem("bookData");
        const allBooks = JSON.parse(allBooksJSON);
        const allRequestedBooksJSON = localStorage.getItem("borrowData");
        const allRequestedBooks = JSON.parse(allRequestedBooksJSON);
        const allUserDataJSON = localStorage.getItem("userData");
        const allUserData = JSON.parse(allUserDataJSON);
        
        let allRequestedBooksWithData = []

        allUserData.forEach(user => {
          allRequestedBooks.forEach(requestedBook => {
            if (requestedBook.userEmail === user.email && requestedBook.isBorrowed == false) {
              const bookId = requestedBook.bookId;
              const existingBook = allBooks.find(book => book._id === bookId);

              if (existingBook) {
                allRequestedBooksWithData = allRequestedBooksWithData.map(singleBorrowBookData => {
                  if (singleBorrowBookData.book._id === bookId) {
                    singleBorrowBookData.amount += requestedBook.amount;
                  }
                  return book;
                });

                if (!allRequestedBooksWithData.some(book => book._id === bookId)) {
                  const singleBorrowBookData = {
                      "book" :  existingBook,
                      "user" : user,
                      "amount" :  requestedBook.amount
                  }
                  allRequestedBooksWithData.push(singleBorrowBookData);
                }
              }
            }
          })
        });


        return {
          status: true,
          data: allRequestedBooksWithData,
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
}
