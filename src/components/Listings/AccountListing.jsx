import MemoListing from "./MemoListing";
import PoolListing from "./PoolListing";
import SourceListing from "./SourceListing";

export default function AccountListing({ account }) {
    if (account.type == "POOL") return <PoolListing account={account}/>
    else if (account.type == "MEMO") return <MemoListing account={account}/>
    else if (account.type == "SOURCE") return <SourceListing account={account}/>
    else return <PoolListing account={account}/>
}