import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signup/Signin";
import Todo from "./components/Todo/Todo";
import { useDispatch } from "react-redux";
import { authActions } from "./Store";

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = sessionStorage.getItem("id");
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/signin" />;
};

const AppRouter = () => (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/todo" element={<ProtectedRoute element={<Todo />} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
);

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const id = sessionStorage.getItem("id");
        if (id) {
            dispatch(authActions.login());
        }
    }, [dispatch]);

    return (
        <div>
            <Router>
                <Navbar />
                <AppRouter />
                <Footer />
            </Router>
        </div>
    );
};

export default App;