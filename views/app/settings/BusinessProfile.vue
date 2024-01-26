<template>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="inline-block input-label">
        Profile Picture / Brand Image
      </label>
      <Fileinput title="Profile Picture / Brand Image" />
    </div>

    <VueSelect label="Industry" :options="industry" v-model="organization.industry" />
    <Textinput label="Business Name" classInput="w-full" class="col-span-2" v-model="organization.name" />
    <Textarea label="Business Description" class="col-span-2" v-model="organization.description" />
    <Textinput label="Business Email" classInput="w-full" v-model="organization.email" />
    <Textinput label="Business Website" classInput="w-full" v-model="organization.website" />
    <Button 
      v-if="!isNew"
      text="Save Changes" 
      btnClass="btn-dark w-1/3 justify-self-end"
      class="col-span-2"
      :class="`${!isProfileUpdated ? ' opacity-40 cursor-not-allowed' : ''}`"
      :disabled="!isProfileUpdated"
      @click="updateOrganization" />
    <Button 
      v-if="isNew"
      text="Create New Business" 
      btnClass="btn-dark w-1/3 justify-self-end"
      class="col-span-2"
      @click="createOrganization" />

  </div>
</template>

<script>
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import Fileinput from "@/components/Fileinput";
import VueSelect from "@/components/Select/VueSelect";
import Button from "@/components/Button";
import { useOrganizationStore } from "@/store/organization";

export default {
  components: {
    Textinput,
    Textarea,
    Fileinput,
    VueSelect,
    Button,
  },
  data() {
    return {
      organization: {
        name: "",
        description: "",
        industry: "",
        email: "",
        website: "",
      },
      industry: [
        {
          value: "option1",
          label: "Option 1",
        },
        {
          value: "option2",
          label: "Option 2",
        },
        {
          value: "option3",
          label: "Option 3",
        },
      ]
    }
  },
  props: {
    isNew: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    isProfileUpdated() {
      const organizationStore = useOrganizationStore();
      const organizationData = organizationStore.organization;
      return (
        this.organization.name !== organizationData.name ||
        this.organization.description !== organizationData.description ||
        this.organization.industry !== organizationData.industry ||
        this.organization.email !== organizationData.email ||
        this.organization.website !== organizationData.website
      ); 
    },
  },
  methods: {
    async updateOrganization() {
      const organizationStore = useOrganizationStore();
      await organizationStore.updateOrganization(this.organization);
    },
    async createOrganization() {
      const organizationStore = useOrganizationStore();
      await organizationStore.createOrganization(this.organization);
    },
  },
  created() {
    // Get organization data from the store and populate the form
    const organizationStore = useOrganizationStore();

    if(!this.isNew) {
      const organizationData = organizationStore.organization;
      this.organization = {
        name: organizationData.name,
        description: organizationData.description,
        industry: organizationData.industry,
        email: organizationData.email,
        website: organizationData.website,
      };
    }
  },

};
</script>