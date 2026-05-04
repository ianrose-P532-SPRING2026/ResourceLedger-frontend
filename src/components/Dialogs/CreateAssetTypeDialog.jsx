import { useState, useRef, useEffect } from 'react';

import { createResource } from "../../services/api";

function CreateAssetTypeDialog({ onUpdate, disabled }) {
  const dialogRef = useRef(null);
  const openModal = () => dialogRef.current.showModal();
  const closeModal = () => dialogRef.current.close();

  const [name, setName] = useState('');


  const onOpen = () => {
    setName('');
    openModal();
  }

  const onCancel = () => {
    setName('');
    closeModal();
  }

  const onSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Submitted name:', name);
    
    try {
      const result = await createResource(name, "ASSET", null, 0);
      onUpdate(result.data);
    }
    
    catch (error) {
      if (error.response) {
        const status = error.response.status;
        const statusText = error.response.statusText;
        const details = error.response.data;
        const body = JSON.stringify(details);
        console.log(details);
        alert(`ERR ${status}: ${body}`);
      }
      else if (error.request) {
        alert(`Request Error ${error.code}\nDetails: ${error.request}`);
        console.log("Request Details:", error.request);
      } else {
        alert(`Error: ${error.message}`)
      }
    }

    finally {
      closeModal();
    }
  };

  if (disabled == true) {
    return (
      <>
        <button disabled>Create Asset Type</button>
      </>    
    );
  }

  return (
    <>
      <button onClick={onOpen}>Create Asset Type</button>
      <dialog ref={dialogRef} style={{ padding: '20px' }}>
        <form onSubmit={onSubmit}>
          <h3>Create Asset Type</h3>

          <label>Type: 
            <input 
              type="text" 
              value={name}
              required
              onChange={(e) => setName(e.target.value)} 
            />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </dialog>
    </>
  );
}

export default CreateAssetTypeDialog