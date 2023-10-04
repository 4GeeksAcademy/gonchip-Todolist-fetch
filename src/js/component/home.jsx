import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("")
	const [todos, setTodos] = useState([])

	const getTask = async () => {
		try {
		  let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/gonchip");
		  let data = await response.json()

		  if (response.ok) {
			setTodos(data)
		  } 

		  if (response.status == 404){
			createUser()
		  }

		  console.log(response)

		} catch (error) {
		  console.log(error)
		}
	  };

	  const createUser = async () => {
		try {
			let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/gonchip",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(data)
			})

			if (response.ok){
				getTask()
			}
		} catch (error) {
			
		}
	  }

	  const addTask = async (data) => {
		try {
			let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/gonchip",{
				method:"PUT",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(data)
			})

			if (response.ok) {
				getTask()
			}

		} catch (error) {
			
		}
	  }

	  const deleteTask = (id) => {
		const newTask = todos.filter((t, currentIndex) => id != currentIndex)
		addTask(newTask)
	  }

	  async function deleteAll() {
		try {
			let response = await fetch ("https://playground.4geeks.com/apis/fake/todos/user/gonchip",
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			})


			if (response.ok){
				getTask()
			}
		} catch (error) {
			
		}
	  }

	  useEffect(() => {
		getTask();
	  }, []);

	return (
		<div className="container">
			<h1>My Todos</h1>
			<ul>
				<li>
					<input type="text"
						placeholder="Que tienes que hacer?"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								const Todos = [...todos,{label:inputValue, done:false}]
								addTask(Todos)
								setInputValue("")
							}
						}} />
				</li>
				{todos.map((item, index) => (
					<li> {item.label} <FontAwesomeIcon icon={faCircleXmark}
					className="red-mark" onClick={() => deleteTask(index)} /> </li>
				))}

              <li className="num-tareas">{todos.length} tareas pendientes</li>

			</ul>

			<button onClick={deleteAll}>Limpiar todas las tareas</button>
			
		</div>
	);
};

export default Home;