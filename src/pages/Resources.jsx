import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { readResources } from '../services/api';
import '../style.css';

import NavBar from '../components/navbar';


import CreateConsumableDialog from '../components/CreateResourceDialog';
import CreateAssetTypeDialog from '../components/CreateAssetTypeDialog';
import ConsumableListing from '../components/ConsumableListing';
import AssetTypeListing from '../components/AssetTypeListing';
import CreateAssetDialog from '../components/CreateAssetDialog';

function Resources() {
  const [data, setData] = useState([]);
  const [consumables, setConsumables] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readResources();

        const status = response.status;
        const statusText = response.statusText;
        console.log(`${status}: ${statusText}`);

        const objects = response.data;
        setData(objects);
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

    useEffect(() => {
      const consumableAcc = [];
      const assetAcc = [];

      data.forEach((resource) => {
        if (resource.kind == "ASSET") {
          assetAcc.push(resource);
        } else {
          consumableAcc.push(resource);
        }
      });

      setAssetTypes(assetAcc);
      setConsumables(consumableAcc);
    }, [data]);


  function handleDelete(id) {

  }

  function onUpdateAssets(newData) {
    setAssetTypes(prevData => [...prevData, newData]);
  }

  function onUpdateConsum(newData) {
    setConsumables(prevData => [...prevData, newData]);
  }
  


  if (loading) {
    return (
      <div>
        <NavBar/>
        <h1>Resources</h1>
        <h3>Resource Types:</h3>
        <ul>
          Loading...
        </ul>
      </div>
    );
  } 

  return (
    <div>
      <NavBar/>
      <h1>Resources</h1>
      <div className='resource-page-split'>
        <div>
          <h3>Consumable Types:</h3>
          <CreateConsumableDialog disabled={false} onUpdate={onUpdateConsum}/>
          <ul className='resource-list'>
            {consumables.map(consumable => (
              <li key={consumable.id}>
                <ConsumableListing consumable={consumable}/>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3>Asset Types:</h3>
          <CreateAssetTypeDialog disabled={false} onUpdate={onUpdateAssets}/>
          <CreateAssetDialog disabled={false} onUpdate={onUpdateAssets} allTypes={assetTypes}/>
          <ul className='resource-list'>
            {assetTypes.map(assetType => (
              <li key={assetType.id}>
                <AssetTypeListing assetType={assetType}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      
      

      
      
    </div>
  )
}

export default Resources
