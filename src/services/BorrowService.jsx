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
    console.log(payload);
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allBorrowDataJSON = localStorage.getItem("borrowData");
        const allBorrowData = JSON.parse(allBorrowDataJSON);

        for (let i = 0; i < payload.books.length; i++) {
          const singleBorrowBook = {
            amount: payload.books[i].amount,
            userEmail: payload.email,
            bookId: payload.books[i]._id,
            isBorrowed: false,
            borrowId: uuid(),
            requestTime: new Date(),
          };
          allBorrowData.push(singleBorrowBook);
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

  async getBorrowedBookRequestOfSingleUser(payload) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allBooksJSON = localStorage.getItem("bookData");
        const allBooks = JSON.parse(allBooksJSON);
        const allRequestedBooksJSON = localStorage.getItem("borrowData");
        const allRequestedBooks = JSON.parse(allRequestedBooksJSON);
        const borrowedBooksOfSpecificPerson = [];
        allRequestedBooks.forEach((requestedBook) => {
          if (
            requestedBook.userEmail === payload.email &&
            requestedBook.isBorrowed == false
          ) {
            const bookId = requestedBook.bookId;
            const existingBook = allBooks.find((book) => book._id === bookId);

            if (existingBook) {
              const listItem = {
                bookTitle: existingBook.title,
                id: requestedBook.borrowId,
                amount: requestedBook.amount,
              };

              borrowedBooksOfSpecificPerson.push(listItem);
            }
          }
        });

        return {
          status: true,
          data: borrowedBooksOfSpecificPerson,
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async getAllAcceptedRequests() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allBooksJSON = localStorage.getItem("bookData");
        const allBooks = JSON.parse(allBooksJSON);
        const allRequestedBooksJSON = localStorage.getItem("borrowData");
        const allRequestedBooks = JSON.parse(allRequestedBooksJSON);
        const allUserDataJSON = localStorage.getItem("userData");
        const allUserData = JSON.parse(allUserDataJSON);

        const allRequestedBooksWithData = [];
        allRequestedBooks.forEach((requestedBook) => {
          if (!requestedBook.isBorrowed) return;
          const book = allBooks.find(
            (book) => book._id === requestedBook.bookId
          );
          const user = allUserData.find(
            (user) => user.email === requestedBook.userEmail
          );
          allRequestedBooksWithData.push({
            id: requestedBook.borrowId,
            book: book,
            user: user,
            amount: requestedBook.amount,
            requestTime: requestedBook.requestTime,
          });
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

        const allRequestedBooksWithData = [];
        allRequestedBooks.forEach((requestedBook) => {
          if (requestedBook.isBorrowed) return;
          const book = allBooks.find(
            (book) => book._id === requestedBook.bookId
          );
          const user = allUserData.find(
            (user) => user.email === requestedBook.userEmail
          );
          allRequestedBooksWithData.push({
            id: requestedBook.borrowId,
            book: book,
            user: user,
            amount: requestedBook.amount,
            requestTime: requestedBook.requestTime,
          });
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

  async acceptSingleRequest(payload) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allRequestedBooksJSON = localStorage.getItem("borrowData");
        const allRequestedBooks = JSON.parse(allRequestedBooksJSON);

        const updatedBorrowedBooks = allRequestedBooks.map((requestedBook) => {
          if (requestedBook.borrowId === payload.id) {
            return { ...requestedBook, isBorrowed: true };
          } else {
            return requestedBook;
          }
        });
        localStorage.setItem(
          "borrowData",
          JSON.stringify(updatedBorrowedBooks)
        );

        return {
          status: true,
          data: updatedBorrowedBooks,
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async rejectSingleRequest(payload) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allRequestedBooksJSON = localStorage.getItem("borrowData");
        const allRequestedBooks = JSON.parse(allRequestedBooksJSON);
        const updatedBorrowedBooks = allRequestedBooks.filter(
          (requestedBook) => requestedBook.borrowId !== payload.id
        );
        localStorage.setItem(
          "borrowData",
          JSON.stringify(updatedBorrowedBooks)
        );

        return {
          status: true,
          data: updatedBorrowedBooks,
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async acceptMarkedRequest(payload) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allRequestedBooksJSON = localStorage.getItem("borrowData");
        const allRequestedBooks = JSON.parse(allRequestedBooksJSON);

        payload.data.forEach((id) => {
          allRequestedBooks.forEach((requestedBook) => {
            if (requestedBook.borrowId === id) {
              requestedBook.isBorrowed = true;
            }
          });
        });

        localStorage.setItem("borrowData", JSON.stringify(allRequestedBooks));

        return {
          status: true,
          data: allRequestedBooks,
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async rejectMarkedRequest(payload) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allRequestedBooksJSON = localStorage.getItem("borrowData");
        const allRequestedBooks = JSON.parse(allRequestedBooksJSON);

        const updatedBorrowedBooks = allRequestedBooks.filter(
          (requestedBook) => !payload.data.includes(requestedBook.borrowId)
        );

        localStorage.setItem(
          "borrowData",
          JSON.stringify(updatedBorrowedBooks)
        );

        return {
          status: true,
          data: updatedBorrowedBooks,
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async getBorrowedBookOfSingleUser(payload) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allBooksJSON = localStorage.getItem("bookData");
        const allBooks = JSON.parse(allBooksJSON);
        const allRequestedBooksJSON = localStorage.getItem("borrowData");
        const allRequestedBooks = JSON.parse(allRequestedBooksJSON);
        const borrowedBooksOfSpecificPerson = [];
        allRequestedBooks.forEach((requestedBook) => {
          if (
            requestedBook.userEmail === payload.email &&
            requestedBook.isBorrowed == true
          ) {
            const bookId = requestedBook.bookId;
            const existingBook = allBooks.find((book) => book._id === bookId);

            if (existingBook) {
              const listItem = {
                bookTitle: existingBook.title,
                id: requestedBook.borrowId,
                amount: requestedBook.amount,
              };

              borrowedBooksOfSpecificPerson.push(listItem);
            }
          }
        });

        return {
          status: true,
          data: borrowedBooksOfSpecificPerson,
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async giveBackSingleBook(payload) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allRequestedBooksJSON = localStorage.getItem("borrowData");
        const allRequestedBooks = JSON.parse(allRequestedBooksJSON);
        const updatedBorrowedBooks = allRequestedBooks.filter(
          (requestedBook) => requestedBook.borrowId !== payload.id
        );
        localStorage.setItem(
          "borrowData",
          JSON.stringify(updatedBorrowedBooks)
        );

        return {
          status: true,
          data: updatedBorrowedBooks,
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async cancelBookRequest(payload) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const allRequestedBooksJSON = localStorage.getItem("borrowData");
        const allRequestedBooks = JSON.parse(allRequestedBooksJSON);
        const updatedBorrowedBooks = allRequestedBooks.filter(
          (requestedBook) => requestedBook.borrowId !== payload.id
        );
        localStorage.setItem(
          "borrowData",
          JSON.stringify(updatedBorrowedBooks)
        );

        return {
          status: true,
          data: updatedBorrowedBooks,
        };
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
}
