export default function TransactionListing({ transaction }) {

    return (
        <>
            <p>Desc: {transaction.description}</p>
            <details>
                <summary>Entries</summary>
                <div>
                    <ul>
                    {transaction.entries && transaction.entries.map(entry => (
                        <li key={transaction.id+"-"+entry.id} className="entry-listing">
                        {entry.amount > 0 ?
                        <>
                            <p>DEPOSIT: {entry.amount} TO {entry.account}</p>
                        </>
                        : 
                        <>
                            <p>WITHDRAWAL: {entry.amount} FROM {entry.account}</p>
                        </>
                        }
                        </li>
                    ))}
                    </ul>
                </div>
            </details>
        </>
    )
}