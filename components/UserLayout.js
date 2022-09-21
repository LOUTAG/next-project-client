import UserNavbar from "./UserNavbar";

const UserLayout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <div className="py-8 px-2 sm:px-4 xl:px-8 relative min-h-[calc(100vh-50px)]">{children}</div>
    </>
  );
};
export default UserLayout;
