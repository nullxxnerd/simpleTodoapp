import "./todos.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Checkbox from "@mui/material/Checkbox";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const label = { inputProps: { "aria-label": "Checkbox todo" } };
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
console.log(location.state);
function Todos() {
  const location = useLocation();
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState([
    { id: 1, text: "sample todo", checked: false },
  ]);
  const [todoText, setTodoText] = useState("");

  const persist = (newTodos) => {
    console.log(location.state);
    fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${location.state.verifiedUser}:${location.state.verifiedPassword}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => {});
  };

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch("http://localhost:4000/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${location.state.verifiedUser}:${location.state.verifiedPassword}`,
        },
      });
      if (response.ok) {
        const javab = await response.json();
        setTodos(javab.message);
      } else {
        console.log("ERRORR");
      }
    }
    fetchTodos();
  }, []);

  const addTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = {
      id: Math.random() * todoText.length,
      text: todoText,
      checked: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos([...todos, newTodo]);
    persist(newTodos);
  };
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const toggleTodo = (index: number) => {
    const newTodoList = [...todos];
    newTodoList[index].checked = !newTodoList[index].checked;
    setTodos(newTodoList);
    console.log("in toggle");
    persist(newTodoList);
  };
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="appT">
          <div className="todos">
            <div className="user">
              Todos User : {location.state.verifiedUser}
            </div>
            <div className="day">{daysOfWeek[date.getDay()]}</div>
            <div className="time">{date.toLocaleTimeString()}</div>
            <div className="bottmContainer">
              <div style={{ marginBottom: "1rem" }}>
                <form id="todoform" onSubmit={addTodo}>
                  {" "}
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTodoText(e.target.value);
                    }}
                    className="TodoInput"
                    type="text"
                    placeholder="Add a task.."
                  />
                </form>
              </div>
              <hr
                style={{
                  backgroundColor: "#373c43",
                  border: "none",
                  height: "2px",
                  width: "101%",
                }}
              />
              {todos.map((todo, index) => (
                <div key={todo.id} className="todoitem">
                  {todo.text}
                  <Checkbox
                    checked={todo.checked}
                    onChange={() => {
                      toggleTodo(index);
                    }}
                    {...label}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
export default Todos;
