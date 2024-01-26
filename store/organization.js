// organization.js
import { defineStore } from 'pinia';
import { getOrganizationApi, addOrganizationApi, putOrganizationApi } from '@/api';
import { notificationSocket } from '@/socket';

export const useOrganizationStore = defineStore('organization', {
  state: () => ({
    organization: [],
  }),
  getters: {
    getOrganization: async function () {
      // Check if organization is an empty array
      // console.log("getOrganization 1", this.organization);
      if (this.organization.length === 0) {
        // console.log("Org Len 0");
        // Fetch organization data from API
        await this.fetchOrganization();
      }
      // console.log("getOrganization 2", this.organization);
      return this.organization;
    },
  },
  actions: {
    setOrganization(data) {
      this.organization = data;
    },
    async createOrganization(data) {
      this.organization = data;
      await addOrganizationApi(
        this.organization.name,
        this.organization.logo,
        this.organization.description,
        this.organization.industry,
        this.organization.email,
        this.organization.website,
        this.organization.meta_token,
        this.organization.waba_id,
        this.organization.permanent_token,
        this.organization.meta_login_code
      );
    },
    async updateOrganization(updatedData) {
      this.organization = { ...this.organization, ...updatedData };
      await putOrganizationApi(
        this.organization.id,
        this.organization.name,
        this.organization.logo,
        this.organization.description,
        this.organization.industry,
        this.organization.email,
        this.organization.website,
        this.organization.meta_token,
        this.organization.waba_id,
        this.organization.permanent_token,
        this.organization.meta_login_code
      );
      console.log("updateOrganization after api request", this.organization);
    },
    async fetchOrganization() {
      // Call the API to get organization data
      const response = await getOrganizationApi();
      
      // Update the organization in the store
      this.setOrganization(response[0]);
      console.log("fetchOrganization after api request", this.organization);
      notificationSocket(this.organization.id)
      return response.data;
    },
  },
});
