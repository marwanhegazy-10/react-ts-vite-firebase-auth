import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContext } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContext>
);
