import Footer from "./Footer";

export default function Page({children}) {
    return (
        <div className="page">
            {children}
            <Footer/>
        </div>
    )
}