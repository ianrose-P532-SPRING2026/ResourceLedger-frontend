import { deleteAsset } from "../../services/api";

export default function AssetListing({ asset, onDelete }) {


    const deleteTheAsset = async (e) => {
        if (!confirm(`Are you sure you want to delete ${asset.name}?`)) {
            return;
        }

        try {
            await deleteAsset(asset.id);
            onDelete(asset.id);
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

    return(
        <div className="asset-type-listing">
            <strong>Name: {asset.name}</strong>
            <br/>
            <details>
                <summary>Types</summary>
                <div>
                    <ul>
                        {asset.types.map(type => (
                            <li key={type.id}>
                                {type.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </details>
            <button onClick={deleteTheAsset}>Delete</button>
        </div>
    )
}