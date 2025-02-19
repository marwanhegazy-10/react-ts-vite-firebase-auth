import { Button } from "@/components/ui/button";
import { UseAuth } from "@/context/AuthContext";
import { firebaseAuth } from "@/lib/config";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const { user, loading } = useContext(UseAuth);
  const navigate = useNavigate();
  const auth = firebaseAuth;

  const onLogout = () => {
    auth.signOut().then(
      () => {
        console.log("Signed Out");
        toast.success("Signed Out");
      },
      function (error) {
        console.error("Sign Out Error", error);
        toast.error("Sign Out Error", error);
      }
    );
    navigate("/sign-in");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h3-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full flex-col">
      <div className="flex items-center justify-center w-full absolute top-5 text-7xl text-primary">
        Profile
      </div>

      <div className="flex items-center justify-center w-full h3-bold">
        {user?.email}
      </div>

      <Button className="mt-5" onClick={onLogout} variant={"destructive"}>
        Logout
      </Button>
    </div>
  );
};

export default Profile;
