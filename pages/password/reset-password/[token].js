import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

import { resetPasswordAction, resetResetPasswordAction } from "../../../redux/slices/userSlice";
 
const ResetPassword = ({ token, err }) => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(store=>store.user);
  const { loading, isSuccess, error } = user;

  const ref = useRef();
  ref.current = user;

  useEffect(()=>{

    return ()=>{
        if(ref.current.error || ref.current.isSuccess) return dispatch(resetResetPasswordAction())
    }
  },[])


  const onFormSubmit = (event) => {
    event.preventDefault();
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+=.<>()_~]).{8,32}$/;
    if (!passwordRegex.test(password)) return toast.error("Invalid Password");
    dispatch(resetPasswordAction({token, password}));
  };


  if (err) return <div>{err}</div>;
  return (
    <div className="font-Recoleta">
      <h1 className="mb-4 text-2xl font-semibold text-center">
        Reset Password
      </h1>
      {isSuccess && <div>password has been reset</div>}
      {error && <div>{error}</div>}
      <form
        className="w-[300px] mx-auto text-center mb-4"
        onSubmit={(event) => onFormSubmit(event)}
      >
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
          Reset
        </button>
      </form>
    </div>
  );
};

ResetPassword.defaultProps = {
  token: undefined,
  err: undefined,
};

export default ResetPassword;

export async function getServerSideProps(context) {
  const { token } = context.query;
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/verify-reset-token`,
      { token }
    );
    return {
      props: {
        token: response.data,
      },
    };
  } catch (error) {
    console.log(error.response);
    return {
      props: {
        err: error.response.data.message
      },
    };
  }
}
