import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-wrap items-start">
      <AdminNavbar />
      <div className="w-full sm:w-10/12 min-h-screen py-2 sm:py-4 lg:py-8 px-2 sm:px-4 lg:px-8">{children}</div>
    </div>
  );
};
export default AdminLayout;
