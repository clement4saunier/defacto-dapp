import RequestList from "../content/RequestList";
import { BrowserWalletRequestProvider } from "../context/on-chain/BrowserWalletRequestProvider";

export default function Listing() {
    return (
        <BrowserWalletRequestProvider>
            <RequestList/>
        </BrowserWalletRequestProvider>
    )
}