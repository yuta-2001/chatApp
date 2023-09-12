import NavBar from '../components/nav/NavBar'

export default function DashboardLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="sm:ml-64">
        {children}
      </div>
    </>
  )
}