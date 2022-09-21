/*** modules ***/
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ToastContainer } from "react-toastify";

/*** css ***/
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

/*** components ***/
import Layout from "../components/Layout";
import AdminLayout from "../components/AdminLayout";
import ProtectedRoutes from "../components/ProtectedRoutes.js";

/*** utils ***/
import setupInterceptors from "../utils/api.js";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const admin = router.pathname.includes("admin");

  return (
    <Provider store={store}>    
      <Layout admin={admin}>
        <ProtectedRoutes {...pageProps}>
          <Component {...pageProps} />
        </ProtectedRoutes>
        <ToastContainer />
      </Layout>
    </Provider>
  );
}
setupInterceptors(store.getState().user.userAuth, store.dispatch);
export default MyApp;
