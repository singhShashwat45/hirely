import Header from "./_components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Header/>
      {children}
    </div>
  );
}