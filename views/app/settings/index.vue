<template>
  <div>
    <div class="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse">
      <h4 class="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
        Settings
      </h4>
    </div>
    <div class="flex">
      <SimpleBar class="sidebar-menu px-4 py-2 w-48 h-[75vh] bg-white rounded-md shadow-sm">
        <Navmenu :items="menuItems" />
      </SimpleBar>

      <div class="flex-1">
        <SimpleBar class="flex-1 ml-3 px-6 py-4 h-[75vh] bg-white rounded-md shadow-sm">
          <ProfileInfo v-if="$route.name === 'profile'" />
          <Teammates v-if="$route.name === 'teammates'" />
          <WAsettings v-if="$route.name === 'wa-settings'"/>
          <WAnumbers v-if="$route.name === 'wa-numbers'"/>
        </SimpleBar>
      </div>
    </div>
  </div>
</template>

<script>
import Navmenu from "@/components/Sidebar/Navmenu";
import { SimpleBar } from "simplebar-vue3";
import ProfileInfo from "./ProfileInfo";
import Teammates from "./Teammates";
import WAnumbers from "./WAnumbers";
import WAsettings from "./WAsettings.vue";

export default {
  components: {
    Navmenu,
    SimpleBar,
    ProfileInfo,
    Teammates,
    WAnumbers,
    WAsettings,
  },
  data() {

    return {
      menuItems: [
        {
          title: "Profile Information",
          link: "profile",
        },
        {
          title: "Whatsapp Cloud API",
          link: "wa-settings",
        },
        {
          title: "Whatsapp Numbers",
          link: "wa-numbers",
        },
        {
          title: "Team Members",
          link: "teammates",
        },
      ],
    }
  },
};

</script>