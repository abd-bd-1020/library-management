import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/DefaultPages/HomePage";
import LoginPage from "./pages/DefaultPages/LogIn";
import SignupPage from "./pages/DefaultPages/SignUp";

import BookEditor from "./components/Book/BookEditor";
import PageLayout from "./Layout/PageLayout";
import RequestedBooks from "./pages/UserPages/RequestedBooks";
import PendingRequests from "./pages/AdminPages/PendingRequests";
import GivenBooks from "./pages/AdminPages/GivenBooks";
import BorrowedBooks from "./pages/UserPages/BorrowedBooks";
import useDashboardStore from "./store/useDashBoardStore";
import { ClientEnum } from "./ClientEnum";
import ErrorPage from "./pages/DefaultPages/ErrorPage";

const AppRoutes = () => {
  const currentUserRoleFromStore = useDashboardStore(
    (state) => state.currentRole
  );

  // Function to check if the user is an admin
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PageLayout>
            <HomePage />
          </PageLayout>
        }
      />
      <Route
        path="/homePage"
        element={
          <PageLayout>
            <HomePage />
          </PageLayout>
        }
      />
      {currentUserRoleFromStore === ClientEnum.USER_TYPE && (
        <>
          <Route
            path="/requestedbooks"
            element={
              <PageLayout>
                <RequestedBooks />
              </PageLayout>
            }
          />
          <Route
            path="/borrowbooks"
            element={
              <PageLayout>
                <BorrowedBooks />
              </PageLayout>
            }
          />
        </>
      )}

      <Route
        path="/login"
        element={
          <PageLayout showBar={false}>
            <LoginPage />
          </PageLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <PageLayout showBar={false}>
            <SignupPage />
          </PageLayout>
        }
      />
      <Route
        path="/404"
        element={
          <PageLayout>
            <HomePage />
          </PageLayout>
        }
      />
      {currentUserRoleFromStore === ClientEnum.ADMIN_TYPE && (
        <>
          <Route
            path="/pendingrequests"
            element={
              <PageLayout>
                <PendingRequests />
              </PageLayout>
            }
          />

          <Route
            path="/givenbooks"
            element={
              <PageLayout>
                <GivenBooks />
              </PageLayout>
            }
          />
          <Route
            path="/bookeditor"
            element={
              <PageLayout>
                <BookEditor />
              </PageLayout>
            }
          />
        </>
      )}
      <Route
        path="*"
        element={
          <PageLayout showBar={false}>
            <ErrorPage />
          </PageLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
