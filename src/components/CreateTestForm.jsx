import { useState } from "react";
import { createTest } from "../services/api";


function CreateTestForm({ onUpdate }) {
  const [text, setText] = useState('');


  const onSubmit = (e) => {
    e.preventDefault();

    console.log('Submitted Text:', text);

    createTest(text)
      .then(object => {
        onUpdate(object);
      })
  };


  return (
    <form onSubmit={onSubmit}>
      <label>Text:</label>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateTestForm