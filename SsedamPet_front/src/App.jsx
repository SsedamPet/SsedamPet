import { Route, Routes } from "react-router-dom";
import AuthRoute from "./routes/AuthRoute/AuthRoute";
import MainRoute from "./routes/MainRoute/MainRoute";

export default function App() {
  return (
    <MainRoute/>
  );
}