import { deleteResource } from "../../services/api"
import UpdateAssetTypeDialog from "../Dialogs/UpdateAssetTypeDialog";

export default function AssetTypeListing({ assetType, onDelete, onUpdate }) {
    
    const deleteAssetType = async (e) => {
        if (!confirm(`Are you sure you want to delete ${assetType.name}?`)) {
            return;
        }

        try {
            await deleteResource(assetType.id);
            onDelete(assetType.id);
            alert("Deleted.");
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
    }

    /*
    <details>
        <summary>Assets</summary>
        <div>
            <ul>
                {assetType.assets.map(asset => (
                    <li key={asset}>
                        {asset}
                    </li>
                ))}
            </ul>
        </div>
    </details>
    */
   
    return(
        <div className="asset-type-listing">
            <strong>Name: {assetType.name}</strong>
            <br/>
            <span>Type: Asset</span>
            <br/>

            <UpdateAssetTypeDialog onUpdate={onUpdate} assetType={assetType}/>
            <button onClick={deleteAssetType}>Delete</button>
        </div>
    )
}