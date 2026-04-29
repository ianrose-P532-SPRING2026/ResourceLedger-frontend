import { useState, useRef, useEffect } from 'react';

import { createResource } from "../services/api";

function CreateResourceDialog({ onUpdate, disabled }) {
  const dialogRef = useRef(null);
  const openModal = () => dialogRef.current.showModal();
  const closeModal = () => dialogRef.current.close();

  const [name, setName] = useState('');
  const [kind, setKind] = useState('');
  const [unit, setUnit] = useState('');


  const onOpen = () => {
    setName('');
    setUnit('');
    setKind('CONSUMABLE');
    openModal();
  }

  const onCancel = () => {
    setName('');
    setUnit('');
    setKind('CONSUMABLE');
    closeModal();
  }

  const onSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Submitted name:', name);
    console.log('Submitted kind:', kind);
    console.log('Submitted unit:', unit);
    
    try {
      const result = await createResource(name, kind, unit);
      const status = result.status;
      const statusText = result.statusText;
      console.log(`${status}: ${statusText}`)
      onUpdate(result.data);
    }
    
    catch (error) {
      if (error.response) {
        const status = error.response.status;
        const statusText = error.response.statusText;
        const details = error.response.data;
        alert(`ERR ${status}: ${details}`);
      }
      else if (error.request) {
        alert(`No response.`);
      } else {
        alert(`Unknown error: ${error.message}`)
      }
    }

    finally {
      closeModal();
    }
  };

  if (disabled == true) {
    return (
      <>
        <button disabled>Create Resource Type</button>
      </>    
    );
  }

  return (
    <>
      <button onClick={onOpen}>Create Resource Type</button>
      <dialog ref={dialogRef} style={{ padding: '20px' }}>
        <form onSubmit={onSubmit}>
          <h3>Create Resource Type</h3>

          <label>Name: 
            <input 
              type="text" 
              value={name}
              required
              onChange={(e) => setName(e.target.value)} 
            />
          </label>

          <label>Kind:
            <select 
              onChange={(e) => setKind(e.target.value)} 
              defaultValue="CONSUMABLE"
            >
              <option value={"CONSUMABLE"}>Consumable</option>
              <option value={"ASSET"}>Asset</option>
            </select>
          </label>

          <label>Unit: 
            <input 
              type="text" 
              value={unit}
              required
              onChange={(e) => setUnit(e.target.value)} 
            />
          </label>

          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </dialog>
    </>
  );
}

export default CreateResourceDialog