import React from "react";

interface EditorProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: () => void;
}

const Editor: React.FC<EditorProps> = ({ text, setText, handleAdd }) => {
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>추가</button>
    </div>
  );
};

export default Editor;
