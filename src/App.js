import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomeComponent from "./pages/HomeComponent";
import AccountComponent from "./pages/AccountComponent";
import CardsComponent from "./pages/CardsComponent";
import useAuth from "./useAuth";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  const [isAuth, login, logout] = useAuth(false);
  return (
    <div>
      <h2>Protected Routes Tutorial</h2>
      <Router>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/accounts">Accounts (Protected)</Link>
          </li>
          <li>
            <Link to="/cards">Cards (UnProtected)</Link>
          </li>
        </ul>
        {isAuth ? (
          <>
            <div className="ui message brown">You are logged in..</div>
            <button className="ui button blue" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="ui message violet">You are logged out..</div>
            <button className="ui button blue" onClick={login}>
              Login
            </button>
          </>
        )}
        <Routes>
          <Route path="/" exact element={<HomeComponent />} />
          <Route path="/cards" element={<CardsComponent />} />
          {/* <ProtectedRoute path="/accounts" component={AccountComponent} auth={ isAuth}/> */}
          <Route element={<ProtectedRoute />}>
            <Route path="/accounts" element={<AccountComponent />} exact />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
