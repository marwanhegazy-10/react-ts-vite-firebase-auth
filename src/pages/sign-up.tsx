"use client";
"use no memo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";

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

const SignUpForm = () => {
  // 1. Get the navigate function from the react-router-dom package. This
  // allows us to navigate the user to another page.
  const navigate = useNavigate();

  // 2. Define the form using the useForm hook from the react-hook-form package.
  // The form will have two fields: email and password. The email field is
  // required and must be a valid email address. The password field is required
  // and must be at least 8 characters long. The form will also validate the
  // fields on every change.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // 3. Define a submit handler for the form. When the form is submitted, we
  // call the createUserWithEmailAndPassword function from the firebase/auth
  // package with the email and password fields as arguments.
  // If the sign up is successful, we log a success message to the console,
  // display a success toast with a message, and navigate to the Sign in page.
  // If the sign up fails, we log an error message to the console, display an
  // error toast with the error message, and stay on the same page.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    createUserWithEmailAndPassword(firebaseAuth, values.email, values.password)
      .then(() => {
        console.log("User created successfully in firebase");
        toast.success("User created successfully in firebase");
        navigate("/sign-in");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("Email already exists! ");
          toast.error("Sign up failed", {
            description: "Email already exists!",
          });
        } else {
          console.log(error);
          toast.error("Sign up failed", {
            description: error.message,
          });
        }
      });
    console.log(values);
  }

  // 4. Render the form.
  return (
    <div className="flex flex-1 items-center justify-center overflow-x-">
      <div className="">
        <Form {...form}>
          <div className="flex-center flex-col sm:w-420 md:w-96">
            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 ">
              Create an account
            </h2>
            <p className="small-medium md:base-regular text-light-3">
              To test Firebase, you must create an account
            </p>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 flex w-full flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  // The email field is a required field and must be a valid
                  // email address.
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  // The password field is a required field and must be at
                  // least 8 characters long.
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="shad-button_primary">
                Sign up
              </Button>

              <GoogleButton />
              <p className="text-small-regular mt-2 text-center text-light-2">
                Already have an account?{" "}
                <Link
                  to={"/sign-in"}
                  className="text-small-semibold ml-1 text-primary"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
