# 📌 React + TypeScript Todo 앱

이 프로젝트는 `Create React App`을 사용하여 생성되었으며, `TypeScript`와 `Context API`, `useReducer`를 활용하여 Todo 리스트를 관리합니다.

---

## 🚀 프로젝트 개요
이 프로젝트에서는 `React`와 `TypeScript`를 활용하여 Todo 리스트를 관리합니다. 주요 기능은 다음과 같습니다:

- **할 일 추가 / 삭제 기능** (`useReducer` 활용)
- **전역 상태 관리** (`Context API` 활용)
- **컴포넌트 분리 및 재사용성 향상**
- **Styled-components 대신 `App.css`로 스타일 관리**

---

## 📂 폴더 구조

```
/src
 ├── components
 │   ├── Editor.tsx  // 입력 필드 및 추가 버튼
 │   ├── TodoItem.tsx  // 개별 Todo 아이템
 ├── contexts
 │   ├── TodoContext.tsx  // 전역 상태 관리
 ├── App.tsx  // 메인 컴포넌트
 ├── App.css  // 스타일 파일
```

---

## 🛠️ 사용 기술
- `React`
- `TypeScript`
- `Context API`
- `useReducer`

---

## 📌 TypeScript 문법 설명

### 1️⃣ **TypeScript에서 인터페이스 정의**
TypeScript에서 `interface`를 사용하여 `props`나 상태 객체의 타입을 지정할 수 있습니다.

```tsx
interface Todo {
  id: number;
  content: string;
}
```
> `Todo` 인터페이스를 정의하여 `id`는 숫자, `content`는 문자열 타입으로 지정합니다.

---

### 2️⃣ **함수형 컴포넌트의 타입 지정**
React 컴포넌트는 `React.FC<Props>`를 사용하여 타입을 명확히 할 수 있습니다.

```tsx
const Editor: React.FC<{ text: string; setText: React.Dispatch<React.SetStateAction<string>>; handleAdd: () => void; }> = ({ text, setText, handleAdd }) => {
  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAdd}>추가</button>
    </div>
  );
};
```
> `text`, `setText`, `handleAdd`의 타입을 명시하여 안전한 코드 작성이 가능하도록 합니다.

---

### 3️⃣ **useState에서 타입 지정**
```tsx
const [text, setText] = useState<string>("");
```
> `useState`를 사용할 때 상태의 타입을 `string`으로 지정하여 TypeScript에서 자동으로 추론할 수 있도록 합니다.

---

### 4️⃣ **useReducer에서 액션과 상태 타입 지정**
```tsx
const todoReducer = (state: Todo[], action: { type: string; payload?: any }) => {
  switch (action.type) {
    case "CREATE":
      return [...state, { id: action.payload.id, content: action.payload.content }];
    case "DELETE":
      return state.filter(todo => todo.id !== action.payload.id);
    default:
      return state;
  }
};
```
> `state`는 `Todo[]` 타입으로 지정되며, `action` 객체의 타입도 명시하여 코드의 안정성을 높입니다.

---

### 5️⃣ **useContext에서 타입 정의**
```tsx
const TodoStateContext = createContext<Todo[] | null>(null);
const TodoDispatchContext = createContext<React.Dispatch<{ type: string; payload?: any }> | null>(null);
```
> `useContext`를 사용할 때 `createContext<T>`를 사용하여 타입을 정의할 수 있습니다.

```tsx
export const useTodoState = () => {
  const context = useContext(TodoStateContext);
  if (!context) throw new Error("useTodoState must be used within a TodoProvider");
  return context;
};
```
> `useContext`의 반환값이 `null`일 가능성이 있으므로, 명확한 오류 처리를 추가할 수 있습니다.

---

## ✅ 실행 방법

### 1️⃣ 프로젝트 클론
```sh
git clone https://github.com/your-repo/todo-app.git
cd todo-app
```

### 2️⃣ 패키지 설치
```sh
npm install
```

### 3️⃣ 개발 서버 실행
```sh
npm start
```

브라우저에서 `http://localhost:3000`을 열어 실행할 수 있습니다.

---

## 🔗 추가 참고 자료
- [React 공식 문서](https://reactjs.org/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [Create React App](https://create-react-app.dev/)

## 📌 주요 기능 및 코드 설명

### 1️⃣ 상태 관리를 위한 `useReducer` 적용
```tsx
const todoReducer = (state: Todo[], action: { type: string; payload?: any }) => {
  switch (action.type) {
    case "CREATE":
      return [...state, { id: action.payload.id, content: action.payload.content }];
    case "DELETE":
      return state.filter(todo => todo.id !== action.payload.id);
    default:
      return state;
  }
};
```
> `useReducer`를 활용하여 상태 관리를 진행하며, `CREATE`와 `DELETE` 액션을 정의합니다.

---

### 2️⃣ Context API를 활용한 전역 상태 관리
```tsx
const TodoStateContext = createContext<Todo[] | null>(null);
const TodoDispatchContext = createContext<React.Dispatch<{ type: string; payload?: any }> | null>(null);
```
> `Context API`를 사용하여 Todo 리스트(`TodoStateContext`)와 액션 디스패치(`TodoDispatchContext`)를 전역에서 관리합니다.

```tsx
<TodoStateContext.Provider value={todos}>
  <TodoDispatchContext.Provider value={dispatch}>
    <App />
  </TodoDispatchContext.Provider>
</TodoStateContext.Provider>
```
> `Provider`를 통해 상태와 액션을 하위 컴포넌트로 전달합니다.

---

### 3️⃣ Todo 추가 기능
```tsx
const handleAdd = () => {
  if (text.trim() === "") return;
  dispatch({ type: "CREATE", payload: { id: idRef.current++, content: text } });
  setText("");
};
```
> `dispatch`를 통해 새로운 할 일을 추가합니다.

---

### 4️⃣ Todo 삭제 기능
```tsx
<TodoItem
  key={todo.id}
  id={todo.id}
  content={`${index + 1}. ${todo.content}`}
  onDelete={() => dispatch({ type: "DELETE", payload: { id: todo.id } })}
/>
```
> `TodoItem`에서 삭제 버튼을 클릭하면 해당 Todo가 제거됩니다.

