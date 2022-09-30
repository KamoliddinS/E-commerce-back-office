import { Suspense, lazy, useEffect } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
// redux
import {useSelector, useDispatch} from 'react-redux';
// layouts
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// components
import LoadingScreen from "../components/LoadingScreen";
import HomeScreen from "../screens/HomeScreen";
import MoneyScreen from "../screens/MoneyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";
import TextureScreen from "../screens/TextureScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import OrderListScreen from "../screens/OrderListScreen";
import AddProductScreen from "../screens/AddProduct";
import AuthScreen from '../screens/AuthScreen'

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

  const isAuthenticated = Boolean(useSelector((state) => state.user.data.token));

  if (isAuthenticated) {

  }

 // protect routes of unauthenticated users
  const routes = [
      {
        path: "/",
        element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/auth" />,
        children: [
          { element: <Navigate to="/home" replace />, index: true },
          { path: "home", element: <HomeScreen /> },
          { path: "money", element: <MoneyScreen /> },
          { path: "profile", element: <ProfileScreen /> },
          { path: "chat", element: <ChatScreen /> },
          { path: "add-product", element: <AddProductScreen /> },
          { path: "texture", element: <TextureScreen /> },
          { path: "order-history", element: <OrderHistoryScreen /> },
          { path: "order-list", element: <OrderListScreen /> },
          {
            path: "user",
            children: [
              {
                element: <Navigate to="/user/" replace />,
                index: true,
              },
              { path: "five", element: <PageFive /> },
              { path: "six", element: <PageSix /> },
            ],
          },
        ],
      },

      {
        path: "*",
        element: <LogoOnlyLayout />,
        children: [
          {path: 'auth', element: <AuthScreen />},
          { path: "404", element: <NotFound /> },
          { path: "*", element: <Navigate to="/404" replace /> },
        ],
      },
      { path: "*", element: <Navigate to="/404" replace /> },
    ]

  return useRoutes(routes);



  // return useRoutes([
  //   {
  //     path: "/",
  //     element: <DashboardLayout />,
  //     children: [
  //       { element: <Navigate to="/home" replace />, index: true },
  //       { path: "home", element: <HomeScreen /> },
  //       { path: "money", element: <MoneyScreen /> },
  //       { path: "profile", element: <ProfileScreen /> },
  //       { path: "chat", element: <ChatScreen /> },
  //       { path: "add-product", element: <AddProductScreen /> },
  //       { path: "texture", element: <TextureScreen /> },
  //       { path: "order-history", element: <OrderHistoryScreen /> },
  //       { path: "order-list", element: <OrderListScreen /> },
  //       {
  //         path: "user",
  //         children: [
  //           {
  //             element: <Navigate to="/user/" replace />,
  //             index: true,
  //           },
  //           { path: "five", element: <PageFive /> },
  //           { path: "six", element: <PageSix /> },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     path: "*",
  //     element: <LogoOnlyLayout />,
  //     children: [
  //       { path: "404", element: <NotFound /> },
  //       { path: "*", element: <Navigate to="/404" replace /> },
  //     ],
  //   },
  //   { path: "*", element: <Navigate to="/404" replace /> },
  // ]);
}

// Dashboard
// const PageOne = Loadable(lazy(() => import("../pages/PageOne")));
// const PageTwo = Loadable(lazy(() => import("../pages/PageTwo")));
// const PageThree = Loadable(lazy(() => import("../pages/PageThree")));
// const PageFour = Loadable(lazy(() => import("../pages/PageFour")));
const PageFive = Loadable(lazy(() => import("../pages/PageFive")));
const PageSix = Loadable(lazy(() => import("../pages/PageSix")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));

// import * as React from "react";
// import { Routes, Route, Outlet, Link } from "react-router-dom";

// export default function App() {
//   return (
//     <div>

//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="about" element={<About />} />
//           <Route path="dashboard" element={<Dashboard />} />

//           {/* Using path="*"" means "match anything", so this route
//                 acts like a catch-all for URLs that we don't have explicit
//                 routes for. */}
//           <Route path="*" element={<NoMatch />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// }
