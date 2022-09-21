import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";

const Layout = ({ admin, children }) => {
  if (admin) return <AdminLayout>{children}</AdminLayout>;
  return <UserLayout>{children}</UserLayout>;
};
export default Layout;
