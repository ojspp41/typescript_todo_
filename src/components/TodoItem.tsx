import React from "react";

interface TodoItemProps {
  content: string;
  id: number;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ content, id, onDelete }) => {
  return (
    <li>
        
      {content}
      <button onClick={() => onDelete(id)}>삭제</button>
    </li>
  );
};

export default TodoItem;
