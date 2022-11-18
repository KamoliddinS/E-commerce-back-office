import { Suspense, lazy, useEffect, useState } from "react";
// react-router
import {
  Navigate,
  useRoutes,
  useLocation,
  useNavigate,
} from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../redux/slices/userSlice";
import { getShops } from "../redux/slices/shopSlice";
// layouts
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// components
import LoadingScreen from "../components/LoadingScreen";
import HomeScreen from "../screens/HomeScreen";
import MoneyScreen from "../screens/MoneyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import InvoiceScreen from "../screens/InvoiceScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import OrderListScreen from "../screens/OrderListScreen";
import AddProductScreen from "../screens/AddProduct";
import AuthScreen from "../screens/AuthScreen";
import ProductList from "../screens/ProductListScreen";
import EditProductScreen from "../screens/EditProduct";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const dispatch = useDispatch();
  const tokenLocalStorage = localStorage.getItem("token") || "";

  const userData = useSelector((state) => state.user.data);
  const [authinficated, setAuthinficated] = useState(
    Boolean(tokenLocalStorage !== "")
  );

  useEffect(() => {
    if (tokenLocalStorage !== "") {
      dispatch(getProfile(tokenLocalStorage));
      dispatch(getShops(tokenLocalStorage));
    }
  }, []);

  useEffect(() => {
    setAuthinficated(tokenLocalStorage !== "");
  }, [userData]);

  // protect routes of unauthenticated users
  const routes = [
    {
      path: "/",
      element: authinficated ? <DashboardLayout /> : <Navigate to="/auth" />,
      children: [
        { element: <Navigate to="/money" replace />, index: true },
        { path: "home", element: <HomeScreen /> },
        { path: "money", element: <MoneyScreen /> },
        { path: "profile", element: <ProfileScreen /> },
        { path: "chat", element: <ChatScreen /> },
        { path: "invoice", element: <InvoiceScreen /> },
        { path: "order-history", element: <OrderHistoryScreen /> },
        { path: "order-list", element: <OrderListScreen /> },
        { path: "product-list", element: <ProductList /> },
        { path: "product-add", element: <AddProductScreen /> },
        { path: "product-edit", element: <EditProductScreen /> },
        {
          path: "user",
          children: [
            {
              element: <Navigate to="/" replace />,
              index: true,
            },
          ],
        },
      ],
    },

    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        {
          path: "auth",
          element: authinficated ? <Navigate to="/money" /> : <AuthScreen />,
        },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ];

  return useRoutes(routes);
}

const PageFive = Loadable(lazy(() => import("../pages/PageFive")));
const PageSix = Loadable(lazy(() => import("../pages/PageSix")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
