import AdminSidebar from "@/components/adminLayout/adminSidebar"
import Navbar from "@/components/navbar/Navbar";



const AdminLayout = ({ children }) => {
    return (
      <div>
        <Navbar />
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