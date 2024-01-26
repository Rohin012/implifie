<template>
  <div class="h-full">
    <header class="border-b border-slate-100 dark:border-slate-700">
      <div class="flex py-3 md:px-6 px-3 items-center">
        <div class="flex-1">
          <div class="flex space-x-3 rtl:space-x-reverse">
            <span v-if="width <= 1024" @click="store.mobileChatSidebar = true"
              class="text-slate-900 dark:text-white cursor-pointer text-xl self-center ltr:mr-3 rtl:ml-3">
              <Icon icon="heroicons-outline:menu-alt-1" />
            </span>
            <div class="flex-none">
              <div class="h-10 w-10 rounded-full relative">
                <span
                  class="block bg-slate-100 w-full h-full object-cover rounded-full flex items-center justify-center text-slate-800 dark:text-slate-300 text-sm font-medium">{{
                    getInitials(store.user.fullName) }}</span>
              </div>
            </div>
            <div class="flex-1 text-start">
              <span class="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px] truncate">{{
                store.user.fullName }}
              </span>
              <span class="block text-slate-500 dark:text-slate-300 text-xs font-normal">Active now</span>
            </div>
          </div>
        </div>
        <div class="flex-none flex md:space-x-3 space-x-1 items-center rtl:space-x-reverse">
          <div class="msg-action-btn">
            <Icon icon="heroicons-outline:phone" />
          </div>
          <div class="msg-action-btn">
            <Icon icon="heroicons-outline:video-camera" />
          </div>

          <div @click="openinfo" class="msg-action-btn">
            <Icon icon="heroicons-outline:dots-horizontal" />
          </div>
        </div>
      </div>
    </header>

    <SimpleBar class="h-[55vh] chat-content custom-scrollbar" ref="scrollContainer">
      <div class="msgs overflow-y-auto msg-height py-6 space-y-6" ref="chatheight">
        <div class="block md:px-6 px-4" v-for="(item, i) in getChats" :key="i">
          <div class="flex space-x-2 items-start group rtl:space-x-reverse" v-if="item.status === 0">
            <div class="flex-none">
              <div class="h-8 w-8 rounded-full">
                <span
                  class="block bg-slate-100 w-full h-full object-cover rounded-full flex items-center justify-center text-slate-800 dark:text-slate-300 text-sm font-medium">{{
                    getInitials(store.user.fullName) }}</span>
              </div>
            </div>
            <div class="flex-1 flex space-x-4 rtl:space-x-reverse">
              <div>
                <div
                  class="flex-1 flex-wrap justify-between text-contrent p-2 bg-slate-50 rounded-md whitespace-pre-wrap break-all">
                  <div class="text-slate-600 text-sm font-normal">{{ item.content }}</div>
                  <div class="flex justify-end font-normal justify-end text-xs text-slate-400 dark:text-slate-400">{{
                    item.time }}</div>
                </div>
              </div>
              <div class="opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                <Dropdown classMenuItems=" w-[100px] top-0" :items="chatAction">
                  <div
                    class="h-8 w-8 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 text-slate-900 flex flex-col justify-center items-center text-xl rounded-full">
                    <Icon icon="heroicons-outline:dots-horizontal" />
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
          <!-- sender -->
          <div class="flex space-x-2 items-start justify-end group w-full rtl:space-x-reverse"
            v-if="item.status === 1 || item.status === 2 || item.status === 3">
            <div class="no flex space-x-4 rtl:space-x-reverse">
              <div class="opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                <Dropdown classMenuItems=" w-[100px] left-0 top-0  " :items="chatAction">
                  <div
                    class="h-8 w-8 bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full text-slate-900">
                    <Icon icon="heroicons-outline:dots-horizontal" />
                  </div>
                </Dropdown>
              </div>

              <div>
                <div
                  class="flex-1 flex-wrap justify-between text-contrent p-2 bg-success-450 rounded-md whitespace-pre-wrap break-all">
                  <div class="text-slate-800 text-sm font-normal">{{ item.content }}</div>
                  <div class="flex justify-end font-normal justify-end text-xs text-slate-600">{{ item.time }}
                    <div class="flex mr-3" v-if="item.status === 1">
                      <Icon icon="heroicons-outline:check" class="text-base font-black text-primary-300"  />
                    </div>
                    <div class="flex mr-3" v-if="item.status === 2">
                      <Icon icon="heroicons-outline:check" class="text-base font-black text-primary-300"  />
                      <Icon icon="heroicons-outline:check" class="-mx-3 text-base font-black text-primary-300" />
                    </div>
                    <div class="flex mr-3" v-if="item.status === 3">
                      <Icon icon="heroicons-outline:check" class="text-base font-black text-primary-500"  />
                      <Icon icon="heroicons-outline:check" class="-mx-3 text-base font-black text-primary-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-none">
              <div class="h-8 w-8 rounded-full">
                <img :src="store.user.avatar" alt="" class="block w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </div>
          <!-- me  -->
        </div>
      </div>
    </SimpleBar>

    <footer
      class="md:px-6 px-4 sm:flex md:space-x-4 sm:space-x-2 rtl:space-x-reverse border-t md:pt-1 pt-1 border-slate-100 dark:border-slate-700">
      <div class="my-5 flex-none sm:flex hidden md:space-x-3 space-x-1 rtl:space-x-reverse">
        <div
          class="h-8 w-8 cursor-pointer bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full">
          <Icon icon="heroicons-outline:link" />
        </div>
        <div
          class="h-8 w-8 cursor-pointer bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full">
          <Icon icon="heroicons-outline:emoji-happy" />
        </div>
      </div>
      <div class="flex-1 relative flex space-x-3 rtl:space-x-reverse">
        <div class="flex-1">
          <!-- <textarea type="text" placeholder="Type your message..."
            class="focus:ring-0 focus:outline-0 block w-full bg-transparent dark:text-white resize-none"
            v-model.trim="newMessage" @keydown.enter.exact.prevent="sendMessage"
            rows="3"
            @keydown.enter.shift.exact.prevent="newMessage += '\n'" /> -->
            <Textarea
              name="largesize"
              placeholder="Type your message..."
              classInput="focus:ring-0 focus:outline-0 block w-full bg-transparent resize-none"
              v-model.trim="newMessage" @keydown.enter.exact.prevent="sendMessage" 
              @keydown.enter.shift.exact.prevent="newMessage += '\n'" />
        </div>
        <div class="mt-3 flex-none md:pr-0 pr-3 tooltipGroup">
          <!-- <button type="button" @click="sendMessage"
            class="h-8 w-8 bg-slate-900 text-white flex flex-col justify-center items-center text-lg rounded-full">
            <Icon icon="heroicons-outline:paper-airplane" class="transform rotate-[60deg]" />
          </button> -->
          <Tooltip placement="top" arrow v-if="width > 1024">
            <template #button>
              <div
                @click="sendMessage"
                class="mt-2 h-8 w-8 bg-slate-900 text-white flex flex-col justify-center items-center text-lg rounded-full"
              >
                <Icon icon="heroicons-outline:paper-airplane" class="transform rotate-[80deg]" />
              </div>
            </template>
            <span>Send Message</span>
          </Tooltip>
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup>
import Dropdown from "@/components/Dropdown";
import { SimpleBar } from "simplebar-vue3";
import Icon from "@/components/Icon";
import { computed, ref, onMounted, watchEffect } from "vue";
import { useChatStore } from "@/store/chat";
import Textarea from "@/components/Textarea";
import Tooltip from "@/components/Tooltip";

const width = ref(0);
const handleResize = () => {
  width.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();

  // Scroll to the bottom initially
  scrollToBottom();

  // Add an event listener to scroll to the bottom whenever new messages are added
  watchEffect(() => {
    scrollToBottom();
  });

});
const newMessage = ref("");
const store = useChatStore();
const getChats = computed(() => store.messFeed);
console.log("getChats :: ", getChats.value);
const chatheight = ref(null);
const scrollContainer = ref(null);

const sendMessage = () => {
  // if newMessge empty return
  console.log("sendMessage calleds")
  if (newMessage.value) {
    store.sendMessage({
      content: newMessage.value,
      media: null,
    });
    console.log("sendMessage newMessage sent to store :: ", newMessage.value);
  }
  newMessage.value = "";
  
};

const scrollToBottom = () => {
  if (scrollContainer.value) {
    // Scroll to the bottom of the container
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
  }
};

const chatAction = [
  {
    label: "Remove",
    link: "#",
  },
  {
    label: "Forward",
    link: "#",
  },
];
const openinfo = () => {
  store.notOpenInfo();
};

const getInitials = (fullName) => {
  if (fullName) {
    return fullName
      .split(' ')
      .map((word) => (word[0] ? word[0].toUpperCase() : ''))
      .join('');
  }
  return '';
};
</script>
<style lang="scss" scoped>
.msg-height {
  height: calc(100% - 0px);
}

.msg-action-btn {
  @apply md:h-8 md:w-8 h-6 w-6 cursor-pointer bg-slate-100 dark:bg-slate-900 dark:text-slate-400 text-slate-900 flex flex-col justify-center items-center md:text-xl text-sm rounded-full;
}
.tooltipGroup {
  @apply flex flex-wrap;
  .btn {
    @apply mr-3 mb-3;
  }
}

.custom-scrollbar {
  background-image: url('https://cloud.implifie.com/assets/images/all-img/whatsapp_background.png');
  background-size: cover;
  background-repeat: no-repeat;
}</style>
