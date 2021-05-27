import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue"
import PairMatrixPage from "../views/PairMatrixPage.vue"
import NewStair from "../components/NewStair/NewStair.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/newstair",
    name: "NewStair",
    component: NewStair,
  },
  {
    path: "/pairmatrix/:name",
    name: "PairMatrix",
    component: PairMatrixPage,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
