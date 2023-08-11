import NavBar from '../components/nav/NavBar'

export default function DashboardLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="p-4 sm:ml-64">
        <div className="p-4">
          {children}
        </div>
      </div>
    </>
  )
}