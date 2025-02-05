import { useReducer, useRef ,createContext,useState, useContext } from "react";
import "./App.css";
import Editor from "./components/Editor";
import TodoItem from "./components/TodoItem";

interface Todo {
  id: number;
  content: string;
}

// 액션 타입 정의
const CREATE = "CREATE";
const DELETE = "DELETE";

// Context 생성
const TodoStateContext = createContext<Todo[] | null>(null);
const TodoDispatchContext = createContext<React.Dispatch<{ type: string; payload?: any }> | null>(null);

// 리듀서 함수 정의
const todoReducer = (state: Todo[], action: { type: string; payload?: any }) => {
  switch (action.type) {
    case CREATE:
      return [...state, { id: action.payload.id, content: action.payload.content }];
    case DELETE:
      return state.filter(todo => todo.id !== action.payload.id);
    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const idRef = useRef(0);
  const [text, setText] = useState("");

  return (
    <TodoStateContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        <div className="App">
          <h1>Todo</h1>
          <Editor text={text} setText={setText} handleAdd={() => {
            if (text.trim() === "") return;
            dispatch({ type: CREATE, payload: { id: idRef.current++, content: text } });
            setText("");
          }} />
          <ul>
            {todos.map((todo,index) => (
              
              <TodoItem key={todo.id} id={todo.id} content={`${index + 1}. ${todo.content}`} onDelete={() => dispatch({ type: DELETE, payload: { id: todo.id } })} />
            ))}
          </ul>
        </div>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export default App;

// Custom Hooks for using Context
export const useTodoState = () => {
  const context = useContext(TodoStateContext);
  if (!context) throw new Error("useTodoState must be used within a TodoProvider");
  return context;
};

export const useTodoDispatch = () => {
  const context = useContext(TodoDispatchContext);
  if (!context) throw new Error("useTodoDispatch must be used within a TodoProvider");
  return context;
};
