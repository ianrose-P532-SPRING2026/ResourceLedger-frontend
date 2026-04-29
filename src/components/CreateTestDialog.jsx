import { useState, useRef, useEffect } from 'react';

import { createTest } from "../services/api";

function CreateTestDialog({ onUpdate, disabled }) {
  const dialogRef = useRef(null);
  const openModal = () => dialogRef.current.showModal();
  const closeModal = () => dialogRef.current.close();

  const [text, setText] = useState('');


  const onOpen = () => {
    setText('');
    openModal();
  }

  const onCancel = () => {
    setText('');
    closeModal();
  }

  const onSubmit = (e) => {
      e.preventDefault();
  
      console.log('Submitted Text:', text);
  
      createTest(text)
        .then(object => {
          onUpdate(object);
        });
      
      closeModal();
    };

  if (disabled == true) {
    console.log("FORM DISABLED");
    return (
      <>
        <button disabled>Create Test Object</button>
      </>    
    );
  }

  console.log("FORM ENABLED");

  return (
    <>
      <button onClick={onOpen}>Create Test Object</button>
      <dialog ref={dialogRef} style={{ padding: '20px'}}>
        <form onSubmit={onSubmit}>
          <label>Text:</label>
          <input 
            type="text"
            required
            value={text}
            onChange={(e) => setText(e.target.value)} 
          />
          <br/>
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </dialog>
    </>
  );
}

export default CreateTestDialog