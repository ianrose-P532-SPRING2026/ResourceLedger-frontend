import { useState, useRef, useEffect } from 'react';
import Select from 'react-select';

import { allocateGeneric, readResources } from "../services/api";

function GenericResourceAllocationDialog({ onUpdate, disabled, action }) {
  const dialogRef = useRef(null);
  const openModal = () => dialogRef.current.showModal();
  const closeModal = () => dialogRef.current.close();

  const [amount, setAmount] = useState(0);
  const [selectedType, setSelectedType] = useState({});
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await readResources();
  
          const objects = response.data;
          setResources(objects);
          setLoading(false);
        } 
        catch (error) {
          if (error.response) {
            const status = error.response.status;
            const statusText = error.response.statusText;
            const details = error.response.data;
            alert(`ERR ${status}: ${details}`);
          }
          else if (error.request) {
            alert(`Request Error ${error.code}\nDetails: ${error.request}`);
            console.log("Request Details:", error.request);
          } else {
            alert(`Error: ${error.message}`)
          }
        }      
      }
  
      fetchData();
    }, []);


  const onOpen = () => {
    setAmount(0);
    setSelectedType();
    openModal();
  }

  const onCancel = () => {
    closeModal();
  }

  const onSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Submitted amount:', amount);
    console.log('Submitted type:', selectedType);
    
    try {
      const result = await allocateGeneric(action.id, selectedType.id, amount);
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
        <button disabled>Allocate General Resource</button>
      </>    
    );
  }

  return (
    <>
      <button onClick={onOpen}>Allocate General Resource</button>
      <dialog ref={dialogRef} style={{ padding: '30px' }}>
        <form onSubmit={onSubmit}>
          <h3>Allocate General Resource</h3>
  
          <label>Amount: 
            <input 
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)} 
            /> <span>{selectedType && selectedType.unit}</span>
          </label>
          <br/>
          <label>Types: </label>
          <Select
            options={resources}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}            
            onChange={setSelectedType}
            isSearchable
            required
          />

          
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </dialog>
    </>
  );
}

export default GenericResourceAllocationDialog