import { defineStore } from "pinia";
import { ref } from 'vue';
import { chatSocket } from '@/socket';
import { getChatContactsApi, getChatMessageApi } from '@/api';

export const useChatStore = defineStore('chat', {
  state: () => {
    return {
      selectedNumber: null,
      settingToggle: false,
      openinfo: true,
      activechat: false,
      searchContact: "",
      mobileChatSidebar: false,
      socketInstance: null,
      // profileinfo: {},
      messFeed: ref([]),
      user: {},
      contacts: ref([]),
      chats: [],
    }
  },
  getters: {
    // getprofileinfo: (state) => state.profileinfo,
    // get contacts with search
    getContacts: async function (state) {
      if (state.contacts.length === 0) {
        // console.log("Contacts Len 0");
        // Fetch contacts data from API
        await this.fetchChatContacts();
      }

      if (state.searchContact) {
        return state.contacts.filter((contact) =>
          contact.fullName
            .toLowerCase()
            .includes(state.searchContact.toLowerCase())
        );
      }
      console.log("getContacts :: ", state.contacts);
      return state.contacts;
    },
    // getChats: (state) => state.chats,
  },
  actions: {
    setContact(data) {
      this.contacts = data  ;
    },
    setSelectedNumber(value) {
      this.selectedNumber = value;
    },
    async fetchChatContacts() {
      const response = await getChatContactsApi(true);
      console.log("fetchChatContacts respone :: ", response);

      // Update the Contact in the store
      this.setContact(response);
      console.log("fetchChatContacts after api request", this.contacts);
      return response.data;
    },
    async fetchChatMessages(contact_id) {
      const existingChatIndex = this.chats.findIndex((chat) => chat.contactId === contact_id);

      if (existingChatIndex !== -1) {
        // Update the existing entry if contactId exists
        const response = await getChatMessageApi(contact_id);
        console.log("getChatMessageApi respone :: ", response);

        console.log("fetchChatMessages before update", this.chats);
        this.chats[existingChatIndex] = response;
        console.log("fetchChatMessages after update", this.chats);

        return response.data;
      } else {
        // Push a new entry if contactId does not exist
        const response = await getChatMessageApi(contact_id);
        console.log("getChatMessageApi respone :: ", response);

        console.log("fetchChatMessages before push", this.chats);
        this.chats.push(response);
        console.log("fetchChatMessages after push", this.chats);

        return response.data;
      }
    },
    toggleUserSetting() {
      this.settingToggle = !this.settingToggle;
    },
    sendMessage(payload) {
      console.log("store sendMessage Enterred");
      console.log("store sendMessage payload content :: ", payload.content);
      console.log("store sendMessage payload media :: ", payload.media);
      if (this.socketInstance) {
        // Send a message through the WebSocket connection
        console.log("sendMessage if socketInstance enterred :: ", this.socketInstance);
        const socketPayload = {
          "number": this.selectedNumber,
          "message_type": "text",
          "content": {
            "body": payload.content,
            "preview_url": true
          }
        };
        console.log("chatStore sendMessage socketPayload :: ", socketPayload);
        this.socketInstance.sendMessage(socketPayload);
      }
      console.log("store sendMessage Exiting");
    },
    //openinfo
    notOpenInfo() {
      this.openinfo = !this.openinfo;
    },
    //open chat
    openChat: async function (data) {
      console.log('store selectedNumber :: ', this.selectedNumber);
      console.log('openChat :: ', data);
      this.activechat = true;
      this.mobileChatSidebar = false;
      this.user = data;
      console.log("openChat user", this.user);

      // this.chats = [];
      // if (this.chats.length === 0) {
      // console.log("Contacts Len 0");
      // Fetch contacts data from API
      await this.fetchChatMessages(data.id);
      // }

      // Connect to the socket with the room_id (data.id)
      this.socketInstance = chatSocket(data.id);

      // Here Fetch the messages from backend and update this.messFeed = item.messages;
      console.log('openChat contacts :: ', this.contacts);
      console.log('openChat chats :: ', this.chats);
      console.log('openChat messFeed :: ', this.messFeed);
      this.messFeed = [];
      this.chats.map((item) => {
        console.log("openChat item", item);
        if (item.contactId === data.id) {
          const numbers = item.numbers
          console.log("openChat numbers", numbers);
          this.messFeed = numbers[0].messages;
          console.log("openChat messFeed", this.messFeed);
        }
      });
    },
    updateMessageStatus(data) {
      console.log('updateMessageStatus data :: ', data);
      const message = this.messFeed.find((msg) => msg.id === data.id.id);

      if (message) {
        // Update the status property of the found message
        switch (data.message) {
          case 'sent':
            message.status = 1;
            console.log(`messFeed msg id ${data.id.id} status changed to ${data.message}. message object ${message}`);
            break;
          case 'delivered':
            message.status = 2;
            console.log(`messFeed msg id ${data.id.id} status changed to ${data.message}. message object ${message}`);
            break;
          case 'read':
            message.status = 3;
            console.log(`messFeed msg id ${data.id.id} status changed to ${data.message}. message object ${message}`);
            break;
          default:
            console.warn(`Unknown status: ${data.message}`);
        }
      } else {
        const msg = {
          "id": data.id.id,
          "content": data.id.message,
          "media": null,
          "time": data.id.time,
          "date": data.id.date,
          "status": 1
        };
        console.log('updateMessageStatus Else condition msg :: ', msg);
        this.messFeed.push(msg);
      }
    },
    openMobileSidebar() {
      this.mobileChatSidebar = !this.mobileChatSidebar;
    },
  }
})