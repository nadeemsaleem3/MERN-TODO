import React, { useCallback, useEffect, useState } from "react"; 
import "./Todo.css";
import TodoCards from "./TodoCards";
import Update from "./Update";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
let id = sessionStorage.getItem("id");
let toUpdateTodo = [];

const Todo = () => {
    id = sessionStorage.getItem("id");
    const [inputs, setInputs] = useState({ title: "", body: "" });
    const [todos, setTodos] = useState([]);

    const show = () => {
        document.getElementById("textarea").style.display = "block";
    };

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const submit = useCallback(async () => {
        if (inputs.title === "" || inputs.body === "") {
            toast.error("Title or Body should not be empty");
            return;
        }
    
        if (id) {
            try {
                const response = await axios.post("http://localhost:1000/api/v2/addTask", {
                    title: inputs.title,
                    body: inputs.body,
                    id: id 
                });
                console.log("Response from API:", response);
                setInputs({ title: "", body: "" });
                toast.success("Your Task Added.");
            } catch (error) {
                console.error("Error posting task:", error);
                toast.error("Failed to add task!");
            }
        } else {
            setTodos([...todos, inputs]);
            setInputs({ title: "", body: "" });
            toast.success("Your Task Added.");
            toast.error("Your Task not Saved! Please Signup/Signin.");
        }
    }, [inputs, todos]);

    const del = async (Cardid) => {
        console.log(Cardid);

        if (id) {
            await axios
            .delete(`http://localhost:1000/api/v2/deleteTask/${Cardid}`, {
                data: {id: id},
            })
            .then(()=> {
                toast.success("Your Task Deleted.");
                todos.splice(Cardid, "1");
                setTodos([...todos]);
            });
        }
        else {
            toast.error("Please Sign Up First.");
        }
    };

    const dis = (value) => {
        console.log(value);
        document.getElementById("todo-update").style.display = value;
    };

    const update = (value) => {
        toUpdateTodo = todos[value];
    };

    useEffect(() => {
        if (id) {
                const fetch = async () => {
                try {
                    const response = await axios.get(`http://localhost:1000/api/v2/getTasks/${id}`);
                    setTodos(response.data.list);
                } catch (error) {
                    console.error("There was an error fetching data:", error);
                }
            };
            fetch();
        }
    }, [submit]);

    return (
        <>
        <div className="todo">
            <ToastContainer />
            <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                <div className="d-flex flex-column todo-inputs-div w-100 p-1">
                    <input 
                        type="text" 
                        placeholder="TITLE" 
                        className="my-3 p-2 todo-inputs" 
                        name="title" 
                        onClick={show} 
                        onChange={change} 
                        value={inputs.title} 
                    />
                    <textarea 
                        id="textarea" 
                        type="text" 
                        placeholder="BODY" 
                        className="p-2 todo-inputs" 
                        name="body" 
                        onChange={change} 
                        value={inputs.body} 
                    />
                </div>
                <div className="w-lg-50 w-100 d-flex justify-content-end my-3">
                    <button className="home-btn px-2 py-1" onClick={submit}>Add</button>
                </div>
            </div>
            <div className="todo-body">
                <div className="container-fluid">
                    <div className="row">
                        {todos && todos.map((item, index) => (
                            <div key={index} className="col-lg-3 col-11 mx-lg-5 mx-3 my-2">
                                <TodoCards title={item.title} body={item.body} id={item._id} delid={del} display={dis} updateId = {index} toBeUpdate = {update}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="todo-update" id="todo-update">
            <div className="container update">
            <Update display={dis} update = {toUpdateTodo}/>
            </div>
        </div>
        </>
    );
}

export default Todo;
