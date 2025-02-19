"use client";
"use no memo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "@/components/GoogleButton";
import { toast } from "sonner";
import { firebaseAuth } from "@/lib/config";

const SigninValidation = z.object({
  email: z.string().email({
    message: "Email must be a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const SignInForm = () => {
  // Get the navigate function from the react-router-dom package to navigate the user to another page.
  const navigate = useNavigate();

  // Use the useForm hook to create a form with the following properties:
  // - resolver: Use the zodResolver function to validate the form data using the SigninValidation schema.
  // - defaultValues: Set the default values for the email and password fields.
  // - mode: Set the mode to "onChange" to validate the form data on every change.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  // When the form is submitted, call the signInWithEmailAndPassword function from the firebase/auth package
  // with the email and password fields as arguments.
  // If the sign in is successful, log a success message to the console, display a success toast, and navigate
  // to the Profile page.
  // If the sign in fails, log an error message to the console, display an error toast with the error message,
  // and stay on the same page.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    signInWithEmailAndPassword(firebaseAuth, values.email, values.password)
      .then(() => {
        console.log("User signed in successfully");
        toast.success("User signed in successfully");
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
        toast.error("User signed in failed", {
          description: error.message,
        });
      });
    console.log(values);
  }
  return (
    <div className="flex flex-1 items-center justify-center overflow-x-">
      {/* The root element of the form */}
      <div className="">
        {/* The form element */}
        <Form {...form}>
          {/* The container element for the form fields */}
          <div className="flex-center flex-col sm:w-420 md:w-96">
            {/* The title element */}
            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 ">
              Log in to your account
            </h2>
            {/* The subtitle element */}
            <p className="small-medium md:base-regular text-light-3">
              Welcome back! Please enter your details
            </p>
            {/* The form element */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 flex w-full flex-col gap-5"
            >
              {/* The email field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* The label element */}
                    <FormLabel>Email</FormLabel>
                    {/* The input element */}
                    <FormControl>
                      <Input type="email" className="shad-input" {...field} />
                    </FormControl>
                    {/* The error message element */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* The password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    {/* The label element */}
                    <FormLabel>Password</FormLabel>
                    {/* The input element */}
                    <FormControl>
                      <Input
                        type="password"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                    {/* The error message element */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* The submit button */}
              <Button type="submit" className="shad-button_primary">
                Sign in
              </Button>

              {/* The Google button */}
              <GoogleButton />
              {/* The sign up link */}
              <p className="text-small-regular mt-2 text-center text-light-2">
                Don't have an account?{" "}
                <Link
                  to={"/sign-up"}
                  className="text-small-semibold ml-1 text-primary"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
