/* ----- EXPERT ROUTES ----- */

import { Routes, Route } from "react-router-dom";
import {
  ExpertOverview,
  ExpertOrders,
  ExpertOrderDetailsPage,
} from "../Pages/Experts";

const ExpertRoutes = () => {
  return (
    <Routes>
      <Route path="expert/overview" element={<ExpertOverview />} />
      <Route path="expert/orders" element={<ExpertOrders />} />

      <Route
        path="/expert/order/details"
        element={<ExpertOrderDetailsPage />}
      />
    </Routes>
  );
};

export default ExpertRoutes;
