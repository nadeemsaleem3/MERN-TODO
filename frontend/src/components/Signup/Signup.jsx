import React, {useState} from "react";
import axios from "axios";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({email:"", username:"", password:""});

    const change = (e)=> {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value});
    };

    const submit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior
        try {
            const response = await axios.post("http://localhost:1000/api/v1/register", inputs);
            alert(response.data.message);
            setInputs({ email: "", username: "", password: "" });
            history("/signin");
          } catch (error) {
            if (error.code === 'ERR_NETWORK') {
              alert('Network error: Please check your connection or server status.');
            } else if (error.response) {
              alert(`Error: ${error.response.data.message || error.response.statusText}`);
            } else {
              alert(`Error: ${error.message}`);
            }
            console.error("Submission error:", error);
          }
      };

    return <div className="signup">
        <div className="container">
            <div className="row">
                <div className="col-lg-8 column d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column w-100 p-3">
                        <input className="p-2 my-3 input-signup" type="email" name="email" placeholder="Enter Your Email" onChange={change} value={inputs.email}></input>
                        <input className="p-2 my-3 input-signup" type="username" name="username" placeholder="Enter Your Username" onChange={change} value={inputs.username}></input>
                        <input className="p-2 my-3 input-signup" type="password" name="password" placeholder="Enter Your Password" onChange={change} value={inputs.password}></input>
                        <button className="btn-signup p-2" onClick={submit}>Sign Up</button>
                    </div>
                </div>
                <div className="col-lg-4 column col-left d-lg-flex justify-content-center align-items-center d-none">
                <HeadingComp first="Sign" second="Up" />
                </div>
            </div>
        </div>
    </div>
};

export default Signup;