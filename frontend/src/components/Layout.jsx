import Navbar from "./NavBar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">{children}</div>
    </div>
  );
}