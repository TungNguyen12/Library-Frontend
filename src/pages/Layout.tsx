import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <NavBar />

      <main style={{ minHeight: '100%', margin: '50px auto' }}>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Layout
