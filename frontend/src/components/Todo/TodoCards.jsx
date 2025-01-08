import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({ title, body, id, delid, display, updateId, toBeUpdate }) => {
    return (
        <div className="p-3 todo-card">
            <div>
                <h5>{title}</h5>
                <p className="todo-card-p">
                    {body.slice(0, 77)}...
                </p>
            </div>
            <div className="d-flex justify-content-around">
                <div className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1" onClick={() => { 
                    display("block");
                    toBeUpdate(updateId);
                    }}>
                    <GrDocumentUpdate className="card-icons" /> Update
                </div>
                <div className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger" onClick={() => { 
                    console.log("Deleting Task ID:", id); // Log the ID before delete
                    delid(id); 
                }}>
                    <RiDeleteBin6Fill className="card-icons del" /> Delete
                </div>
            </div>
        </div>
    );
};

export default TodoCards;