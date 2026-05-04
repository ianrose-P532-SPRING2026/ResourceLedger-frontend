import { useState, useRef, useEffect } from 'react';

import { createResource } from "../../services/api";

function CreateConsumableDialog({ onUpdate, disabled }) {
  const dialogRef = useRef(null);
  const openModal = () => dialogRef.current.showModal();
  const closeModal = () => dialogRef.current.close();

  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [amount, setAmount] = useState("0");


  const onOpen = () => {
    setName('');
    setUnit('');
    setAmount("0.00");
    openModal();
  }

  const onCancel = () => {
    setName('');
    setUnit('');
    closeModal();
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await createResource(name, "CONSUMABLE", unit, amount);
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
        <button disabled>Create Consumable Type</button>
      </>    
    );
  }

  return (
    <>
      <button onClick={onOpen}>Create Consumable Type</button>
      <dialog ref={dialogRef} style={{ padding: '20px' }}>
        <form onSubmit={onSubmit}>
          <h3>Create Consumable Type</h3>

          <label>Name: 
            <input 
              type="text" 
              value={name}
              required
              onChange={(e) => setName(e.target.value)} 
            />
          </label>


          <label>Unit: 
            <input 
              type="text" 
              value={unit}
              required
              onChange={(e) => setUnit(e.target.value)} 
            />
          </label>

          <br/>

          <label>Starting Balance: 
            <input 
              type="number"
              step="any" 
              value={amount}
              min="0"
              onChange={(e) => setAmount(e.target.value)}
              placeholder='0.00'
            />
          </label>

          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </dialog>
    </>
  );
}

export default CreateConsumableDialog