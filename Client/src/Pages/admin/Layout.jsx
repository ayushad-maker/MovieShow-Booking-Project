import { Outlet } from "react-router-dom"
import AdminNavbar from "../../Components/admin/AdminNavbar"
import AdminSideBar from "../../Components/admin/AdminSideBar"



const Layout = () => {
  return (
    <>
    <AdminNavbar/ >
    <div className="flex">
       <AdminSideBar />
        <div className="flex-1 px-4 py-10 md:px-10-h-[calc(100vh-64px) overflow-y-auto]">
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default Layout