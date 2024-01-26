<template>
  <div>
    <Organization />
    <ProfileSettings class="mt-4" />
  </div>
</template>

<script>
import Textinput from "@/components/Textinput";
import ProfileSettings from "./ProfileSettings.vue";
import Organization from "./Organization.vue";

export default {
  components: {
    Textinput,
    ProfileSettings,
    Organization
  },
}
</script>