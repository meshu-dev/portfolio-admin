import Vue from "vue";
import Router from "vue-router";
import store from "./store/store";

import Login from "./views/Login.vue";
import ProfileView from "./views/ProfileView.vue";
import ProfileEdit from "./views/ProfileEdit.vue";
import ProjectList from "./views/ProjectList.vue";
import ProjectView from "./views/ProjectView.vue";
import ProjectForm from "./views/ProjectForm.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "profile",
      component: ProfileView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/profile/edit",
      name: "profile-edit",
      component: ProfileEdit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/projects/:page?",
      name: "project-list",
      component: ProjectList,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/projects/view/:id",
      name: "project-view",
      component: ProjectView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/projects/form/:id?",
      name: "project-form",
      component: ProjectForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/not-found",
      name: "not-found",
      component: NotFound,
      props: true
    },
    {
      path: "*",
      redirect: {
        name: "not-found",
        params: {
          resource: "page"
        }
      }
    }
  ]
});

// Redirect back to login page if logged out
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    let isAuthenticated = false;

    if (user && user.token) {
      if (user.expiryTime == null || Date.now() / 1000 > user.expiryTime) {
        (async function() {
          await store.dispatch("user/logout");
        })();
      } else {
        isAuthenticated = true;
      }
    }

    if (isAuthenticated === false) {
      next("login");
      return;
    }
  }
  next();
});

export default router;
