
function AccountDetails({ account }) {
    return (
        <div>
            <strong>{account.name}</strong>
            <hr></hr>
            <span>Type: {account.type}</span>
            <br></br>
            <span>Holds: {account.resource.name}</span>
            <br></br>
            <span>Balance: {account.balance} {account.resource.unit}</span>

            <details>
                <summary>Entries</summary>
                <div>
                    
                </div>
            </details>
        </div>
    );
}

export default AccountListing;