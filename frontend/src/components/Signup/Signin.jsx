import React, { useState } from "react";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State for inline error messages

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setError(""); // Clear error on input change
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:1000/api/v1/signin", inputs)
    .then((response) => {
      console.log(response.data.user._id);
      sessionStorage.setItem("id", response.data.user._id); // Save user ID to sessionStorage
      dispatch(authActions.login());
      history("/todo"); // Navigate to the todo page
    });
  };

  return (
    <div className="signin">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 column col-left d-none d-lg-flex justify-content-center align-items-center">
            <HeadingComp first="Sign" second="In" />
          </div>
          <div className="col-lg-8 column d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column w-100 p-3">
              {error && <div className="error-message">{error}</div>} {/* Inline error */}
              <input
                className="p-2 my-3 input-signin"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={change}
                value={inputs.email}
              />
              <input
                className="p-2 my-3 input-signin"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={change}
                value={inputs.password}
              />
              <button className="btn-signup p-2" onClick={submit}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;