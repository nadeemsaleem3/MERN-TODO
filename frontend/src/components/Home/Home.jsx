import React from "react";
import "./Home.css";

const Home = () => {
    return <div className="home d-flex justify-content-center align-items-center">
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-center">
                Organize Your <br /> Work And Family Life, Finaly.
            </h1>
            <p>
                Become Focused, Organized and Calm with <br /> Todo App. The World's Best Task Manager App
            </p>
            <button className="home-btn p-2">Make Todo List</button>
        </div>
    </div>
};

export default Home;