import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Students from '@/pages/Students/Students.vue'
import CreateStudent from '@/pages/Students/CreateStudent.vue'
import NotFound from '@/pages/NotFound.vue'
import { authUser } from "@/services/authService";
import UpdateStudent from "@/pages/Students/UpdateStudent.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { isPublic: true },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { isPublic: true },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      redirect: "/dashboard/students",
      children: [
        {
          path: "students",
          children: [
            {
              path: "",
              name: "Students",
              component: Students,
            },
            {
              path: "create",
              name: "CreateStudent",
              component: CreateStudent,
            },
            {
              path: "update/:id",
              name: "UpdateStudent",
              props: true,
              component: UpdateStudent,
            },
          ]
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    }
  ]
})

router.beforeEach(async (to, _from, next) => {
  try {
    if (to.meta.isPublic) {
      return next();
    }

    if (await authUser()) {
      return next();
    }

    return next("/login");
  } catch (err) {
    localStorage.setItem("user", "");
    localStorage.setItem("token", "");

    return next("/login");
  }
});

export default router
