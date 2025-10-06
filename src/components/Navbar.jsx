export default function Navbar({ tab, setTab }) {
  const Btn = ({k,label}) => (
    <button className={`px-3 py-1 rounded ${tab===k?'bg-blue-600 text-white':'bg-white border'}`} onClick={()=>setTab(k)}>{label}</button>
  );
  return (
    <nav className="flex gap-3 mb-6">
      <Btn k="user" label="User" />
      <Btn k="admin" label="Admin" />
      <Btn k="analytics" label="Analytics" />
    </nav>
  );
}
