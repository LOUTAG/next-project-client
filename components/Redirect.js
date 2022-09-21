
/*** modules ***/
import { useRouter } from "next/router";
import { useEffect } from "react";

const Redirect = ({pathname})=>{
    const router = useRouter();
    useEffect(()=>{
        router.push(
            {
              pathname: pathname,
              query: { from: router.pathname },
            },
            pathname
          );
    },[])

    return;
}
export default Redirect;