
export default function AssetTypeListing({ assetType }) {

    return(
        <div className="asset-type-listing">
            <strong>Name: {assetType.name}</strong>
            <br/>
            <span>Type: Asset</span>
            <br/>
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
        </div>
    )
}