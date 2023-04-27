import { Route, Routes, useNavigate } from "react-router";
import { ROUTES } from "./const";
import Home from "../pages/Home";
import UserPage from "../pages/UserPage";

export const Router = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Home navigate={navigate} />} />
      <Route path={ROUTES.USER_PAGE} element={<UserPage />} />
    </Routes>
  );
};
