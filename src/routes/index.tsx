import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Contact from "@/pages/Contact";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
