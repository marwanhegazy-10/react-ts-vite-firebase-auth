import { Routes, Route, Navigate } from "react-router-dom";

import "./globals.css";
import RootLayout from "./RootLayout";
import SignInForm from "./pages/sign-in";
import SignUpForm from "./pages/sign-up";
import Profile from "./pages/profile";
import { Toaster } from "sonner";
import Protected from "./components/Protected";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route path="*" element={<Navigate to="sign-in" replace />} />
        </Route>
      </Routes>

      <Toaster richColors />
    </main>
  );
};

export default App;
