import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/homepage" element={<Homepage />} />
        </Route>

        <Route index element={<Navigate to="/homepage" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
