// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";

// ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
