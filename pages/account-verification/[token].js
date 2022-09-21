import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  accountVerificationAction,
  resetAccountVerificationAction,
} from "../../redux/slices/userSlice";

const AccountVerification = () => {
  const router = useRouter();
  const { token } = router.query;
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { loading, isValidated, error } = user;

  //mounted
  useEffect(() => {
    if (!router.isReady) return;
    dispatch(accountVerificationAction(token));
  }, [router.isReady]);

  //unmounted
  useEffect(()=>{
    return ()=>{
        dispatch(resetAccountVerificationAction());
    }
  },[])

  return (
    <div className="font-Recoleta">
      <h1 className="mb-4 text-2xl font-semibold text-center">
        Account Verification
      </h1>
      {loading ? (
        <div>
          We are trying to validate your account, it may take a few seconds..
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        isValidated && (
          <>
            <div>Your account has been validated, you can now login</div>
            <Link
              href="/login"
              className="bg-orange-300 px-4 py-2 font-semibold rounded capitalize"
            >
              Login
            </Link>
          </>
        )
      )}
    </div>
  );
};
export default AccountVerification;
