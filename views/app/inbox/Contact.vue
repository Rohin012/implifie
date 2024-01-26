<template>
  <div class="divide-y divide-slate-100 dark:divide-slate-700">
    
      <div
        v-for="(item, i) in contacts"
        :key="i"
        @click="openChat(item)"
        class="block w-full py-3 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70"
      >
        <div class="flex space-x-3 px-6 rtl:space-x-reverse">
          <div class="flex-none">
            <div class="h-10 w-10  rounded-full relative">
              <span class="block bg-slate-100 w-full h-full object-cover rounded-full flex items-center justify-center text-slate-800 dark:text-slate-300 text-sm font-medium">
                {{ getInitials(item.fullName) }}
              </span>              
            </div>
          </div>
          <div class="flex-1 text-start flex">
            <div class="flex-1">
              <span class="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]">
                {{ item.fullName.slice(0, 14) + " ..." }}
              </span>
              <span class="block text-slate-600 dark:text-slate-300 text-xs font-normal">
                {{ item.lastmessage.slice(0, 22) + " ..." }}
              </span>
            </div>
            <div class="flex-none ltr:text-right rtl:text-end">
              <span
                class="block text-xs text-slate-400 dark:text-slate-400 font-normal"
                >{{ item.lastmessageTime }}</span
              >
              <!-- <span
                v-if="item.unredmessage > 0"
                class="inline-flex flex-col items-center justify-center text-[10px] font-medium w-4 h-4 bg-[#FFC155] text-white rounded-full"
                >{{ item.unredmessage }}</span
              > -->
            </div>
          </div>
        </div>
      </div>
    
  </div>
</template>

<script>

import { useChatStore } from "@/store/chat";

export default {
  data() {
    return {
      contacts: [],
    };
  },
  async created() {
    try {
      const store = useChatStore();
      await store.getContacts; 
      this.contacts = store.contacts;
      console.log("Created this.contacts :: ", this.contacts)
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  },
  methods: {
    openChat(data) {
      const store = useChatStore();
      store.openChat(data);
    },
  },
  setup() {
    const getInitials = (fullName) => {
      if (fullName) {
        return fullName
          .split(" ")
          .map((word) => (word[0] ? word[0].toUpperCase() : ""))
          .join("");
      }
    };
    return {
      getInitials,
    };
  },
};
</script>
<style></style>
