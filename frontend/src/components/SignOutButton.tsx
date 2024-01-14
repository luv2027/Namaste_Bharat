import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useQueryClient } from "react-query";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const {showToast} = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async() => {
      await queryClient.invalidateQueries("validateToken"); //comes from appcontext.tsx
      
      showToast({message: "Signed out successfully", type: "SUCCESS"});

    }, onError: (error: Error) => {
      showToast({message: error.message, type:"ERROR"});
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button onClick = {handleClick} className= "text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white">Sign Out</button>
  );
};

export default SignOutButton;