import * as ReactDOMClient from "react-dom/client";
import App from "./components/App";
import "./global-styles.css";

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(<App />);
