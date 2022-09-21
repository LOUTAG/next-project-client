/*** modules ***/
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

/*** components ***/
import Spinner from "../components/Spinner";
import Redirect from "./Redirect";

const ProtectedRoutes = ({ children, ...pageProps }) => {
  const { userAuth } = useSelector((store) => store.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (
    !pageProps.protected ||
    (mounted &&
      ((pageProps.admin && userAuth?.isAdmin) ||
        (!pageProps.admin && userAuth)))
  ) {
    return children;
  }

  if (!mounted) {
    return <Spinner />;
  }

  return <Redirect pathname={userAuth ? "/" : "/login"} />;
};

export default ProtectedRoutes;
