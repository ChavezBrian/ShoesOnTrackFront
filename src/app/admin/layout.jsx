import AdminSidebar from "@/components/adminLayout/adminSidebar"
import Navbar from "@/components/navbar/Navbar";



const AdminLayout = ({ children }) => {
  const admin = {isAdmin:true}
    return (
      <div>
        {/* <Navbar user={admin}/> */}
        <AdminSidebar/>
        <div >
          <main >
            {children}
          </main>
        </div>
      </div>
    );
  };
  
  export default AdminLayout;