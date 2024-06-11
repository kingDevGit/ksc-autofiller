import React, { useMemo } from "react";
import { createMemoryRouter, Navigate, RouterProvider } from "react-router-dom";
import MainPage, { MAIN_PAGE_ROUTE } from "../pages/MainPage/MainPage";
import CourseEnrollPage, {
  COURSE_ENROLL_ROUTE,
} from "../pages/CourseEnroll/CourseEnrollPage";

const AppRouter: React.VFC = React.memo(() => {
  const routes = useMemo(() => {
    return [
      {
        path: MAIN_PAGE_ROUTE,
        element: <MainPage />,
      },
      {
        path: COURSE_ENROLL_ROUTE,
        element: <CourseEnrollPage />,
      },
    ];
  }, []);

  const router = useMemo(
    () =>
      createMemoryRouter([
        // Fallback for index route
        {
          path: "/",
          element: <Navigate to={MAIN_PAGE_ROUTE} />,
        },
        // Before login routes
        ...routes,
      ]),
    [routes]
  );

  return <RouterProvider router={router} />;
});

export default AppRouter;
