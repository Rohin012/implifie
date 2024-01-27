import auth from "@/middleware/auth";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/auth/login.vue"),
  },
  {
    path: "/register",
    name: "reg",
    component: () => import("@/views/auth/register.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/views/auth/forgot-password.vue"),
  },
  {
    path: "/success-500",
    name: "success-500",
    component: () => import("@/views/auth/success.vue"),
  },
  {
    path: "/app",
    name: "Layout",
    redirect: "/app/inbox",
    component: () => import("@/Layout/index.vue"),
    meta: {
      middleware: [auth],
    },
    children: [
      {
        path: "onboarding",
        name: "onboarding",
        component: () => import("@/views/onboarding/index.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "connect",
        name: "connect",
        component: () => import("@/views/onboarding/connect.vue"),
        meta: {
          hide: true,
        },
      },
      // app
      {
        path: "inbox",
        name: "inbox",
        component: () => import("@/views/app/inbox"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "contact",
        name: "contacts",
        component: () => import("@/views/app/contact"),
        meta: {
          hide: true,
          appheight: true,
        },
        children: [
          {
            path: "/app/contact/contactProfile/:id", 
            name: "contact-profile",
            component: () => import("@/views/app/contact/contactProfile.vue"),
            meta: {
              hide: true,
              appheight: true,
            },
          }]
      },
      {
        path:"test",
        name:"test",
        component: ()=> import("@/views/app/test"),
        meta:{
          hide:true,
          appheight:true,
        },

      },
      {
        path: "template",
        name: "template",
        component: () => import("@/views/app/template"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "template/create",
        name: "create-template",
        component: () => import("@/views/app/template/CreateTemplate.vue"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "template/edit/:id",
        name: "edit-template",
        component: () => import("@/views/app/template/EditTemplate.vue"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "broadcast",
        name: "broadcast",
        component: () => import("@/views/app/broadcast"),
        meta: {
          hide: true,
          appheight: true,
        },
        children: [
          {
            path: "create",
            name: "create-broadcast",
            component: () => import("@/views/app/broadcast/AddBroadcast.vue"),
            meta: {
              hide: true,
              appheight: true,
            },
          },
          {
            path: "create1",
            name: "create-broadcast1",
            component: () => import("@/views/app/broadcast/AddBroadcast1.vue"),
            meta: {
              hide: true,
              appheight: true,
            },
          },
        ],
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/views/app/settings"),
        redirect: "/app/settings/profile",
        meta: {
          hide: true,
          appheight: true,
        },
        children: [
          {
            path: "profile",
            name: "profile",
            component: () => import("@/views/app/settings"),
          },
          {
            path: "teammates",
            name: "teammates",
            component: () => import("@/views/app/settings"),
          },
          {
            path: "wa-numbers",
            name: "wa-numbers",
            component: () => import("@/views/app/settings"),
          },
          {
            path: "wa-settings",
            name: "wa-settings",
            component: () => import("@/views/app/settings"),
          },
          
        ],
      },
      {
        path: "automation",
        name: "automation",
        component: () => import("@/views/app/automation"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "pricing",
        name: "pricing",
        component: () => import("@/views/app/pricing"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/coming-soon",
    name: "coming-soon",
    component: () => import("@/views/comming-soon.vue"),
  },
  {
    path: "/under-construction",
    name: "under-construction",
    component: () => import("@/views/under-construction.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/views/error.vue"),
  },
];

export default routes;
import auth from "@/middleware/auth";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/auth/login.vue"),
  },
  {
    path: "/register",
    name: "reg",
    component: () => import("@/views/auth/register.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("@/views/auth/forgot-password.vue"),
  },
  {
    path: "/success-500",
    name: "success-500",
    component: () => import("@/views/auth/success.vue"),
  },
  {
    path: "/app",
    name: "Layout",
    redirect: "/app/inbox",
    component: () => import("@/Layout/index.vue"),
    meta: {
      middleware: [auth],
    },
    children: [
      {
        path: "onboarding",
        name: "onboarding",
        component: () => import("@/views/onboarding/index.vue"),
        meta: {
          hide: true,
        },
      },
      {
        path: "connect",
        name: "connect",
        component: () => import("@/views/onboarding/connect.vue"),
        meta: {
          hide: true,
        },
      },
      // app
      {
        path: "inbox",
        name: "inbox",
        component: () => import("@/views/app/inbox"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "contact",
        name: "contacts",
        component: () => import("@/views/app/contact"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "template",
        name: "template",
        component: () => import("@/views/app/template"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "template/create",
        name: "create-template",
        component: () => import("@/views/app/template/CreateTemplate.vue"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "template/edit/:id",
        name: "edit-template",
        component: () => import("@/views/app/template/EditTemplate.vue"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "broadcast",
        name: "broadcast",
        component: () => import("@/views/app/broadcast"),
        meta: {
          hide: true,
          appheight: true,
        },
        children: [
          {
            path: "create",
            name: "create-broadcast",
            component: () => import("@/views/app/broadcast/AddBroadcast.vue"),
            meta: {
              hide: true,
              appheight: true,
            },
          },
          {
            path: "create1",
            name: "create-broadcast1",
            component: () => import("@/views/app/broadcast/AddBroadcast1.vue"),
            meta: {
              hide: true,
              appheight: true,
            },
          },
        ],
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/views/app/settings"),
        redirect: "/app/settings/profile",
        meta: {
          hide: true,
          appheight: true,
        },
        children: [
          {
            path: "profile",
            name: "profile",
            component: () => import("@/views/app/settings"),
          },
          {
            path: "teammates",
            name: "teammates",
            component: () => import("@/views/app/settings"),
          },
          {
            path: "wa-numbers",
            name: "wa-numbers",
            component: () => import("@/views/app/settings"),
          },
          {
            path: "wa-settings",
            name: "wa-settings",
            component: () => import("@/views/app/settings"),
          },
        ],
      },
      {
        path: "automation",
        name: "automation",
        component: () => import("@/views/app/automation"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
      {
        path: "pricing",
        name: "pricing",
        component: () => import("@/views/app/pricing"),
        meta: {
          hide: true,
          appheight: true,
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/coming-soon",
    name: "coming-soon",
    component: () => import("@/views/comming-soon.vue"),
  },
  {
    path: "/under-construction",
    name: "under-construction",
    component: () => import("@/views/under-construction.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/views/error.vue"),
  },
];

export default routes;
