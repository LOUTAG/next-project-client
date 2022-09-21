//modules
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { registerAction, resetRegisterAction } from "../redux/slices/userSlice";

//data
const topicsData = ["node", "react", "firebase", "firestore"];


const Register = () => {
  const router = useRouter();
  const dispatch  = useDispatch();
  const user = useSelector(store=>store.user);
  const { loading, isCreated, error} = user;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [topics, setTopics] = useState(
    topicsData.reduce((acc, topic) => (acc = { ...acc, [topic]: false }), {})
  );
  

  useEffect(()=>{
    if(isCreated){
      toast.success("Your account has been created successfully, please check your email to validate it.");
      dispatch(resetRegisterAction());
      router.push('/login');
    }
  },[isCreated])

  useEffect(()=>{
    if(error) toast.error(error);
  },[error])

  const renderTopics = () => {
    return topicsData.map((topic) => {
      return (
        <div key={uuidv4()} className="pl-4 flex items-center">
          <input
            type="checkbox"
            id={topic}
            onChange={() => setTopics({ ...topics, [topic]: !topics[topic] })}
            checked={topics[topic] ? true : false}
          />
          <label htmlFor={topic} className="pl-2">
            {topic}
          </label>
        </div>
      );
    });
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    const usernameRegex = /^[a-zA-Z.-. ]{2,20}$/;
    if(!usernameRegex.test(username)) return toast.error('Invalid username');

    const emailRegex = /^[a-z0-9.-]+@+[a-z-]+[.]+[a-z]{2,6}$/;
    if(!emailRegex.test(email)) return toast.error('Invalid Email');
    
    const passwordRegex= /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+=.<>()_~]).{8,32}$/;
    if(!passwordRegex.test(password)) return toast.error('Invalid Password');

    dispatch(registerAction({username, email, password, topics}));
  };

  return (
    <div className="font-Recoleta">
      <h1 className="mb-4 text-2xl font-semibold text-center">Register</h1>
      <form
        className="w-[300px] mx-auto text-center mb-4"
        onSubmit={(event) => onFormSubmit(event)}
      >
        <input
          type="text"
          placeholder="username"
          className="p-2 border-2 mb-4 border-gray-300 rounded w-full"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="email"
          placeholder="email"
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
        <div className="w-full text-left mb-4">
          <div className="mb-1">What topics are you interested in ?</div>
          {renderTopics()}
        </div>
        <button type="submit" className="bg-orange-300 px-4 py-2 font-semibold rounded capitalize">Validate</button>
      </form>
    </div>
  );
};
export default Register;
