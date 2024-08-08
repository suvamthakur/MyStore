import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import HomeContainer from "./components/HomeContainer";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore";
import ProductPage from "./components/ProductPage";
import ProductListPage from "./components/ProductListPage";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./components/Login"));
const Cart = lazy(() => import("./components/Cart"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <HomeContainer />,
      },
      {
        path: "/products/:category",
        element: <ProductListPage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/cart",
        element: (
          <Suspense>
            <Cart />,
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense>
        <Login />,
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={appRouter}></RouterProvider>
      </Provider>
    </>
  );
}

export default App;

/*
Body
 - Home page
 - Product list page
 - Single product details page
 - Cart page
 - Order page
 - Login
*/
