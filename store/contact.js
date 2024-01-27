// contact.js
import { defineStore } from 'pinia';
import { getContactApi, addContactApi, updateContactApi } from '@/api';


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
        data.source,
        data.date_time
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

    async fetchContactId(id) {
      try {
        const response = await getContactApi(id);
        return response;
      } catch (error) {
        console.error(`Error fetching contact with ID ${id}:`, error);
        // Return a default or empty object here
        return {}; // You can customize this based on your application's needs
      }
    },
  
    async updateContact(updatedContactData) {
      const updatedContact = { ...this.contacts, ...updatedContactData };
      await updateContactApi(
        updatedContact.id,
        updatedContact.first_name,
        updatedContact.last_name,
        updatedContact.email,
        updatedContact.phone,
        // Add other properties of the contact as needed
      );
      console.log("updateContact after api request", updatedContact);
    
      const updatedIndex = this.contacts.findIndex(contact => contact.id === updatedContact.id);
    
      if (updatedIndex !== -1) {
        this.contacts.splice(updatedIndex, 1, updatedContact);
      }
    
      return updatedContact;
    }
    
  
},
  
});
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
