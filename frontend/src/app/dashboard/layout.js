import NavBar from '../components/Nav/NavBar'

export default function DashboardLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}