import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import PairMatrixPage from "../views/PairMatrixPage.vue";
import NewStair from "../components/NewStair/NewStair.vue";
import JoinMatrix from "../components/JoinMatrix/JoinMatrix.vue";

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
    path: "/pairmatrix/:matrixName",
    name: "PairMatrix",
    component: PairMatrixPage,
    props: true,
  },  
  // {
  //   path: "/pairmatrix/",
  //   name: "PairMatrix",
  //   component: PairMatrixPage,
  // },
  {
    path: "/joinmatrix/",
    name: "JoinMatrix",
    component: JoinMatrix,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
