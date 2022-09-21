import Link from "next/link";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { logoutAction } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const loginNavbar = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Register",
    path: "/register",
  },
  {
    name: "Profile",
    path: "/profile",
  }
];

const logoutNavbar = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Profile",
    path: "/profile",
  }
];

const UserNavbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userAuth } = useSelector((store) => store.user);

  const [mounted, setMounted]= useState(false);

  useEffect(()=>{
    setMounted(true);
  },[]);

  const renderLoginNavbar = () => {
    return loginNavbar.map((item) => {
      return (
        <li key={uuidv4()} className="sm:px-4">
          <Link href={item.path}>
            <a
              className={`w-full p-1 rounded ${
                item.path === router.asPath && "bg-white"
              }`}
            >
              {item.name}
            </a>
          </Link>
        </li>
      );
    });
  };

  const renderLogoutNavbar=()=>{
    return logoutNavbar.map((item) => {
      return (
        <li key={uuidv4()} className="sm:px-4">
          <Link href={item.path}>
            <a
              className={`w-full p-1 rounded ${
                item.path === router.asPath && "bg-white"
              }`}
            >
              {item.name}
            </a>
          </Link>
        </li>
      );
    });
  }

  return (
    <div className="w-full h-[50px] bg-orange-300 font-Recoleta font-semibold text-lg">
      <ul className="nav flex items-center h-full w-full px-4 justify-between sm:justify-start">
        {(mounted && userAuth) ? (
          <>
            {renderLogoutNavbar()}
            <li className="sm:px-4">
              <button
                onClick={() => dispatch(logoutAction())}
                className="w-full sm:px-4"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          renderLoginNavbar()
        )}
      </ul>
    </div>
  );
};
export default UserNavbar;
