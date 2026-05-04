import { useState, useRef, useEffect } from 'react';

import { updateResource } from "../../services/api";

export default function UpdateAssetTypeDialog({ onUpdate, assetType }) {
  const dialogRef = useRef(null);
  const openModal = () => dialogRef.current.showModal();
  const closeModal = () => dialogRef.current.close();

  const [name, setName] = useState('');

  const onOpen = () => {
    setName(assetType.name);
    openModal();
  }

  const onCancel = () => {
    closeModal();
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await updateResource(assetType.id, name, "ASSET", "hours", 0);
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

  
  return (
    <>
      <button onClick={onOpen}>Update</button>
      <dialog ref={dialogRef} style={{ padding: '20px' }}>
        <form onSubmit={onSubmit}>
          <h3>Update Asset Type</h3>

          <label>Name: 
            <input 
              type="text" 
              value={name}
              required
              onChange={(e) => setName(e.target.value)} 
            />
          </label>
          <br/>

          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </dialog>
    </>
  );
}