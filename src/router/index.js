import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../layouts/HomePage.vue";
import Contact from "../pages/Contact.vue";
import SignUp from "../pages/SignUp.vue";
import Login from "../pages/Login.vue";
import WishList from "../pages/WishList.vue";
import Cart from "../pages/Cart.vue";
import notFound from "../pages/notFound.vue";
import Checkout from "../pages/Checkout.vue";
import itemsDetails from "../pages/itemsDetails.vue";
import UserProfile from "../pages/UserProfile.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../pages/Contact.vue"),
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUp,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/wish-list",
    name: "wish-list",
    component: WishList,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/:catchAll(.*)",
    name: "notfound",
    component: notFound,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
  },
  {
    path: "/:nameList/:id",
    name: "itemsDetails",
    component: itemsDetails,
    props: true, // Pass route parameters as props to the component
  },
  {
    path: "/user/profile",
    name: "userProfile",
    component: UserProfile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
