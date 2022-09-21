import { useEffect } from "react";
import { instance } from "../utils/api";


const Profile = () => {

  useEffect(()=>{
    const fetchProfile = async()=>{
      try{
        const response = await instance('/api/users/profile');
        console.log(response);
      }catch(error){
        console.log(error);
      }
    }
    fetchProfile();
  })

  return (
    <div className="font-Recoleta">
      <h1 className="mb-4 text-2xl font-semibold text-center">Profile</h1>
    </div>
  );
};
export default Profile;

export async function getStaticProps(){
  return {
    props: {
      protected: true
    }
  }
}
