import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const Home = () => {
  const [inputValue, setInputValue] = useState("")
  const [todos, setTodos] = useState([])

  const getTask = async () => {
    try {
      let response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/gonchip"
      );
      let data = await response.json()

      if (response.status == 404) {
        setTodos(data); 
      }
    } catch (error) {
      console.log(error)
    }
  }

  const createUser = async () => {
    try {
      let response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/gonchip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([]),
        }
      )

      if (response.ok) {
		getTask()
	  } else {
	  }
	} catch (error) {

	}
  }

  const addTask = async (data) => {
    try {
      let response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/gonchip",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      if (response.ok) {
        getTask()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTask = (id) => {
    const newTask = todos.filter((t, currentIndex) => id !== currentIndex);
    addTask(newTask)
  }

  async function deleteAll() {
    try {
      let response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/gonchip",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (response.ok) {
        getTask()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTask()
  }, [])

  return (
    <div className="container">
      <h1>My Todos</h1>
      <ul>
        <li>
          <input
            type="text"
            placeholder="¿Qué tienes que hacer?"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                const newTodos = [...todos, { label: inputValue, done: false }]
                addTask(newTodos)
              }
            }}
          />
        </li>
        {todos.map((item, index) => (
          <li key={index}>
            {item.label}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="red-mark"
              onClick={() => deleteTask(index)}
            />
          </li>
        ))}

        <li className="num-tareas">{todos.length} tareas pendientes</li>
      </ul>

      <button onClick={deleteAll}>Limpiar todas las tareas</button>
    </div>
  );
};

export default Home