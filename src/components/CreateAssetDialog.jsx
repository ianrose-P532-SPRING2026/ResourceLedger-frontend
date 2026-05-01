import { useState, useRef, useEffect } from 'react';
import Select from 'react-select';

import { createAsset } from "../services/api";

function CreateAssetDialog({ onUpdate, disabled, allTypes }) {
  const dialogRef = useRef(null);
  const openModal = () => dialogRef.current.showModal();
  const closeModal = () => dialogRef.current.close();

  const [name, setName] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);


  const onOpen = () => {
    setName('');
    setSelectedTypes([]);
    console.log(allTypes);
    openModal();
  }

  const onCancel = () => {
    closeModal();
  }

  const onSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Submitted name:', name);
    console.log('Submitted ids:', selectedTypes);
    
    try {
      const result = await createAsset(name, selectedTypes.map(type => type.id));
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
        <button disabled>Create Asset</button>
      </>    
    );
  }

  return (
    <>
      <button onClick={onOpen}>Create Asset</button>
      <dialog ref={dialogRef} style={{ padding: '30px' }}>
        <form onSubmit={onSubmit}>
          <h3>Create Asset</h3>

          <label>Name: 
            <input 
              type="text" 
              value={name}
              required
              onChange={(e) => setName(e.target.value)} 
            />
          </label>

          <label>Types: </label>
          <Select
            options={allTypes}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}            
            onChange={setSelectedTypes}
            isMulti
            isSearchable
          />

          
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </dialog>
    </>
  );
}

export default CreateAssetDialog