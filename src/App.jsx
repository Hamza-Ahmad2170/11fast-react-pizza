import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import store from "../src/store";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import {
  createOrder,
  getMenu,
  getOrder,
  updateOrder,
} from "./services/apiRestaurant";
import { clearCart } from "./features/cart/cartSlice";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} errorElement={<Error />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/menu"
        element={<Menu />}
        errorElement={<Error />}
        loader={async () => {
          const order = await getMenu();
          return order;
        }}
      />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/order/new"
        element={<CreateOrder />}
        action={async ({ request }) => {
          const formData = await request.formData();
          const data = Object.fromEntries(formData);

          const order = {
            ...data,
            cart: JSON.parse(data.cart),
            priority: data.priority === "true",
          };
          const errors = {};
          if (!isValidPhone(order.phone)) {
            errors.phone =
              "Please give us your correct phone number. We might need it to contact you.";
          }
          if (Object.keys(errors).length > 0) {
            return errors;
          }

          // if everything is okay, create new order and redirect
          const newOrder = await createOrder(order);

          store.dispatch(clearCart());

          return redirect(`/order/${newOrder.id}`);
        }}
      />
      <Route
        path="/order/:orderId"
        element={<Order />}
        errorElement={<Error />}
        action={async ({ params }) => {
          return null;
        }}
        loader={async ({ params }) => {
          const order = await getOrder(params.orderId);
          const data = { priority: true };
          await updateOrder(params.orderId, data);
          return order;
        }}
      />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
