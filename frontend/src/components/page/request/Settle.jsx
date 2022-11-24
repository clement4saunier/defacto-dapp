import { useState } from "react";

export default function Settle() {
    const [report, setReport] = useState("");
    return (
        <>
        <p>write your report</p>
        <textarea value={report} onChange={(e) => setReport(e.target.value)}></textarea>
        <button>send report</button>
        </>
    );
}