/*** modules ***/
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

/*** actions ***/
import { loginAction, resetLoginAction } from "../redux/slices/userSlice";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { loading, userAuth, isAuth, error } = user;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    userAuth && router.push("/");
  }, []);

  useEffect(() => {
    if (!isAuth) return;
    toast.success(`You have been authenticated`);
    if (router?.query?.from) {
      router.push(router.query.from);
    } else {
      router.push("/");
    }
    return () => {
      dispatch(resetLoginAction());
    };
  }, [isAuth]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const emailRegex = /^[a-z0-9.-]+@+[a-z-]+[.]+[a-z]{2,6}$/;
    if (!emailRegex.test(email)) return toast.error("Invalid Email");

    if (password === "") return toast.error("Password field is empty");

    dispatch(loginAction({ email, password }));
  };

  return (
    <div className="font-Recoleta">
      <h1 className="mb-4 text-2xl font-semibold text-center">Login</h1>
      <form
        className="w-[300px] mx-auto text-center mb-4"
        onSubmit={(event) => onFormSubmit(event)}
      >
        <input
          type="email"
          placeholder="email"
          autoComplete="on"
          className="p-2 border-2 mb-4  border-gray-300 rounded w-full"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="p-2 border-2 mb-4 border-gray-300 rounded w-full"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="bg-orange-300 block px-4 py-2 font-semibold rounded capitalize"
        >
          Validate
        </button>
        <div className="text-right">
          <Link href="/password/forgot">
            <a className="hover:underline font-semibold">Forgot Password ?</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
