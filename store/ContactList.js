// contact.js
import { defineStore } from 'pinia';
import { getContactGroupApi, addContactGroupApi } from '@/api';

export const useContactListStore = defineStore('contactlist', {
  state: () => ({
    contactlists: [],
  }),
  getters: {
    getContactList: async function () {
      // Check if contactlists is an empty array
      // console.log("getContacts 1", this.contactlists);
      if (this.contactlists.length === 0) {
        // console.log("contactlists Len 0");
        // Fetch contactlists data from API
        await this.fetchContactList();
      }
      // console.log("getContacts 2", this.contactlists);
      return this.contactlists;
    },
  },
  actions: {
    setContactList(data) {
      console.log("setContact data :: ",data);
      this.contactlists = data;
    },
    async createContactList(data) {
      const response = await addContactGroupApi(data);
      // console.log("createContact response :: ", response);
      this.contactlists.push(response)
      // console.log("createContact this contactlists :: ", this.contactlists);
    },
    async fetchContactList() {
      // Call the API to get Contacts data
      const response = await getContactGroupApi();
      
      // Update the contacts in the store
      this.setContactList(response);

      return response;
    },
  },
});
