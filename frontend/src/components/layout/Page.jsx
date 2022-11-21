import Footer from "./Footer";

export default function Page({ children }) {
  return (
    <div className="page">
      <div>{children}</div>
      <Footer />
    </div>
  );
}
