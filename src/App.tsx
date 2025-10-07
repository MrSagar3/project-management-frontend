import { Toaster } from "react-hot-toast";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import AppLayout from "./components/layouts/AppLayout";
import MembersList from "./pages/authorized/MemberList";
import ProjectUpdate from "./pages/authorized/ProjectUpdate";
import { UpdateOrganisation } from "./pages/authorized/UpdateOrganisation";
import UserProfile from "./pages/authorized/UserProfile";
import { PublicRoute } from "./routes/PublicRoutes";

import {
  Home,
  ForgetPassword,
  Login,
  Signup,
  VerifyEmail,
  ErrorPage,
  MyTasks,
} from "@/pages";
import ProtectedRoute from "@/routes/ProtectedRoutes";
const App = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/tasks" element={<MyTasks />} />
            <Route path="/settings" element={<UpdateOrganisation />} />
            <Route path="/projects/:projectId" element={<ProjectUpdate />} />
            <Route path="/members" element={<MembersList />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};
export default App;
