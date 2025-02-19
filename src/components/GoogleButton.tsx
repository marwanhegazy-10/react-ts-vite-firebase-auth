import { firebaseAuth } from "@/lib/config";
import { Button } from "./ui/button";
import google from "/google.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const GoogleButton = () => {
  const navigate = useNavigate();
  const onGoogleSignIn = () => {
    // When the button is clicked, trigger a sign-in flow with Google as the
    // authentication provider.
    //
    // See: https://firebase.google.com/docs/auth/web/google-signin#handle_the_sign-in_flow_with_the_firebase_sdk

    const provider = new GoogleAuthProvider();

    // signInWithPopup() will open a popup window with a Google sign-in flow.
    // If the user signs in successfully, the Promise returned by signInWithPopup()
    // will be resolved.
    signInWithPopup(firebaseAuth, provider)
      .then(() => {
        // If the sign-in is successful, print a success message to the
        // console, display a success toast, and navigate to the Profile page.
        console.log("Google sign-in successful");
        toast.success("Google sign-in successful");
        navigate("/profile");
      })
      .catch((error) => {
        // If the sign-in fails, print an error message to the console,
        // display an error toast with the error message, and stay on the
        // same page.
        console.log(error);
        toast.error("Google sign-in failed", {
          description: error.message,
        });
      });
  };
  return (
    <div>
      <div className="mt-4 flex flex-row items-center justify-center gap-x-3">
        <div className="h-[1px] flex-1 bg-muted-foreground" />
        <div className="text-lg text-foreground">Or</div>
        <div className="h-[1px] flex-1 bg-muted-foreground" />
      </div>
      <Button
        className="mt-5 w-full"
        variant={"outline"}
        type="button"
        onClick={onGoogleSignIn}
      >
        <img src={google} alt="Google" className="mx-2 h-5 w-5" />
        Sign in with Google
      </Button>
    </div>
  );
};

export default GoogleButton;
