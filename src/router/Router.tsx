import { Routes, Route } from "react-router-dom";
import { ROUTE } from "../common/utils/constant";
import MainPage from "../pages/Main";
import TodoPage from "../pages/Todo";

function Router() {
  return (
    <>
      <Routes>
        <Route path={ROUTE.MAIN} element={<MainPage />} />
        <Route path={ROUTE.TODO} element={<TodoPage />} />
      </Routes>
    </>
  );
}

export default Router;
