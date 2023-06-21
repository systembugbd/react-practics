import React, { useEffect, useState } from "react";
import "./Todos.css";
import { AiOutlineOrderedList } from "react-icons/ai";
import { MdOutlineDeleteForever } from "react-icons/md";
import {
  RiCheckboxCircleFill,
  RiCheckboxCircleLine,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";

const Todos = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [checkedId, setCheckedId] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  //   useEffect(() => {
  //     const getCheckedId = localStorage.getItem("checkedId");
  //     const todos = localStorage.getItem("todos");
  //     setCheckedId(JSON.parse(getCheckedId));
  //     setTodos(JSON.parse(todos));
  //   }, [todos, checkedId]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setTodos((todoss) => {
        return [
          ...todoss,
          {
            id: Math.floor(Math.random() * 100),
            text: input,
            desc: "",
          },
        ];
      });
      setInput("");
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    console.log(todos);
  };

  const handleDelete = (id) => {
    const newtodos = todos.filter((todo) => todo.id != id);
    setTodos((todos) => [...newtodos]);
  };

  const handleChecked = (id) => {
    if (!checkedId.includes(id)) {
      setCheckedId(checkedId.concat(id));
      localStorage.setItem("checkedId", JSON.stringify(checkedId));
    } else {
      const removedId = checkedId.filter((deleteId) => deleteId !== id);
      setCheckedId([...removedId]);
      localStorage.setItem("checkedId", JSON.stringify(removedId));
    }
  };

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
              onKeyDownCapture={(e) => handleKeyPress(e)}
            />
          </div>
          <div className="todolist">
            <ul>
              {todos?.length > 0 && todos ? (
                todos?.map((item, index) => (
                  <li className="item" key={index}>
                    <AiOutlineOrderedList className="icon" />
                    <span
                      className={`itemcontent ${
                        checkedId.includes(item.id) ? "done" : ""
                      }`}
                    >
                      {index + 1}. {item.text}
                    </span>
                    {checkedId.map((id) => {
                      if (id === item.id) {
                        return (
                          <RiCheckboxCircleFill
                            key={id}
                            className={`icon checked`}
                            onClick={() => handleChecked(item.id)}
                          />
                        );
                      }
                    })}
                    <RiCheckboxCircleLine
                      className={`icon unchecked`}
                      onClick={() => handleChecked(item.id)}
                    />
                    <MdOutlineDeleteForever
                      className="icon delete"
                      onClick={() => handleDelete(item.id)}
                    />
                  </li>
                ))
              ) : (
                <li className="noitem">There is no todo list</li>
              )}
            </ul>
          </div>
          {todos?.length > 0 && (
            <div className="filter">
              <RiCheckboxBlankCircleLine className="icon filterchecked" />
              <RiCheckboxBlankCircleLine className="icon filterunchecked" />
              <RiCheckboxBlankCircleLine className="icon filterall" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Todos;
