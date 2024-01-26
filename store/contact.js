// contact.js
import { defineStore } from 'pinia';
import { getContactApi, addContactApi } from '@/api';

export const useContactStore = defineStore('contact', {
  state: () => ({
    contacts: [],
  }),
  getters: {
    getContacts: async function () {
      // Check if contacts is an empty array
      // console.log("getContacts 1", this.contacts);
      if (this.contacts.length === 0) {
        // console.log("Contacts Len 0");
        // Fetch contacts data from API
        await this.fetchContact();
      }
      // console.log("getContacts 2", this.contacts);
      return this.contacts;
    },
  },
  actions: {
    setContact(data) {
      console.log("setContact data :: ",data);
      this.contacts = data;
    },
    async createContact(data) {
      const response = await addContactApi(
        data.first_name,
        data.last_name,
        data.phone,
        data.email,
        data.source
      );
      // console.log("createContact response :: ", response);
      this.contacts.push(response)
      // console.log("createContact this contacts :: ", this.contacts);
    },
    async fetchContact() {
      // Call the API to get Contacts data
      const response = await getContactApi();
      
      // Update the contacts in the store
      this.setContact(response);

      return response;
    },
  },
});
