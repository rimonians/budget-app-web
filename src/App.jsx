import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PublicOutlet from "./components/Outlet/PublicOutlet";
import PrivateOutlet from "./components/Outlet/PrivateOutlet";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Budget from "./pages/Budget";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Loading from "./components/Shared/Loading";
import { useDispatch } from "react-redux";
import { authInitiate } from "./redux/features/auth/authSlice";
import { fetchUser } from "./redux/features/user/userSlice";
import { fetchBudgets } from "./redux/features/budgets/budgetsSlice";
import useAuth from "./hooks/useAuth";

const App = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, token } = useAuth();

  useEffect(() => {
    dispatch(authInitiate());
    if (isAuthenticated) {
      dispatch(fetchUser(token));
      dispatch(fetchBudgets(token));
    }
  }, [isAuthenticated]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/*" element={<PublicOutlet />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/*" element={<PrivateOutlet />}>
          <Route path="" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="budget" element={<Budget />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
