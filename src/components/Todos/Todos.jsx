import React, { useState } from "react";
import "./Todos.css";
import { AiOutlineOrderedList } from "react-icons/ai";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RiCheckboxCircleFill, RiCheckboxCircleLine, RiCheckboxBlankCircleLine } from "react-icons/ri";

const Todos = () => {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    const handleChange = (e) => {
      setInput(e.target.value)
    };

    const handleKeyPress = (e)=>{
      if(e.key === "Enter"){
          
            setTodos((todos)=>{
                  return[
                        ...todos,
                        {
                           id:Math.floor(Math.random() * 100),
                           text: input,
                           desc:""
                        }
                  ]
            })
            setInput("")
      }
    }

    const handleDelete = (id)=>{
      const newtodos = todos.filter((todo)=>todo.id != id)
       setTodos(todos=>[
            ...newtodos
      ])
    }
    
    return (
        <>
            <div className="container">
                <h2>Todos App with LocalStorage</h2>
                <div className="todos">
                    <div className="inputBox">
                        <input
                            type="text"
                            id="item"
                            value={input}
                            className="input"
                            onChange={handleChange}
                            onKeyDownCapture={(e)=>handleKeyPress(e)}
                        />
                    </div>
                    <div className="todolist">
                        <ul>
                         {todos.length >0 && todos ? todos.map((item, index) => (
                              <li className="item" key={index}>
                                  <AiOutlineOrderedList className="icon" />
                                  <span className="itemcontent">
                                      {index + 1}. {item.text}
                                  </span>
                                  <RiCheckboxCircleFill className="icon checked" />
                                  <RiCheckboxCircleLine className="icon unchecked" />
                                  <MdOutlineDeleteForever className="icon delete" onClick={()=>handleDelete(item.id)} />
                              </li>
                          )) :
                          <li className="noitem">There is no todo list</li>
                        }
                        </ul>
                    </div>
                    {todos.length>0 && <div className="filter">
                        <RiCheckboxBlankCircleLine  className="icon filterchecked"/>
                        <RiCheckboxBlankCircleLine  className="icon filterunchecked"/>
                        <RiCheckboxBlankCircleLine  className="icon filterall"/>
                    </div>}
                </div>
            </div>
        </>
    );
};

export default Todos;
