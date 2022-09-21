import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordAction,
  resetForgotPasswordAction,
} from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

const Forgot = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { loading, isSuccess, error } = user;
  const [email, setEmail] = useState("");

  const ref = useRef();
  ref.current = user;

  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(forgotPasswordAction({ email }));
    setEmail("");
  };

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  useEffect(() => {
    return () => {
      if (ref.current.error || ref.current.isSuccess)
        return dispatch(resetForgotPasswordAction());
    };
  }, []);

  return (
    <div className="font-Recoleta">
      <h1 className="mb-4 text-2xl font-semibold text-center">
        Forgot Password
      </h1>
      <form
        className="w-[300px] mx-auto text-center mb-4"
        onSubmit={(event) => onFormSubmit(event)}
      >
        {isSuccess && (
          <div className="bg-green-300 text-green-700 rounded p-2 text-semibold mb-2">
            Email has been sent to your email address. Click the link to reset
            your password. Link is avaible only 15 minutes
          </div>
        )}
        <input
          type="email"
          placeholder="email"
          autoComplete="on"
          className="p-2 border-2 mb-4  border-gray-300 rounded w-full"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
        <button
          type="submit"
          className="bg-orange-300 block px-4 py-2 font-semibold rounded capitalize"
        >
          Validate
        </button>
      </form>
    </div>
  );
};


export default Forgot;
