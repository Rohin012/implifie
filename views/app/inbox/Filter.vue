<template>
  <div>
    <div class="flex justify-between">
      <div class="flex min-w-[280px] justify-between space-x-5">
        <Breadcrumb />
        <Button text="New Chat" btnClass="btn-dark h-min btn-md text-sm font-normal"
          icon="heroicons-outline:pencil-square" iconClass="mr-3 text-lg" 
          @click="openNewChat" />
      </div>

      <div class="md:flex md:space-x-4 md:justify-end items-start rtl:space-x-reverse">
        <Select :options="numberList" v-model="selectedNumber" @change="handleNumberChange"
          placeholder="Select Phone Number" classInput="w-[18vw] shadow-sm" />
        <Select :options="chatStatus" placeholder="Select Chat Status" classInput="w-[16vw] shadow-sm" />
        <Select :options="contactList" placeholder="Select Contact List" classInput="w-[16vw] shadow-sm" />

      </div>
    </div>

    <Modal :activeModal="Chatmodal" @close="closeNewChat" title="Start New Chat" sizeClass="max-w-3xl">
      <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
            <form @submit.prevent="submit()">
              <div v-if="stepNumber === 0">
                <div class="grid grid-cols-2 gap-5">
                  <div class="lg:col-span-2 md:col-span-2 col-span-1">
                    <h4 class="text-base text-slate-800 dark:text-slate-300 mb-2">
                      Select Contact
                    </h4>
                  </div>
                  <VueSelect :options="contacts" label="Select Existing Contact" placeholder="Select Contact" />
                  <Textinput label="Send to new contact" type="text" placeholder="Enter the new number"
                    classInput="w-full mt-1" v-model="new_number" />

                  <VueSelect :options="numberList" label="Select WhatsApp Number" placeholder="Select WhatsApp Number" />
                </div>
              </div>
              <div v-if="stepNumber === 1">
                <div class="grid grid-cols-3 gap-5">
                  <div class="lg:col-span-3 md:col-span-3 col-span-1">
                    <h4 class="text-base text-slate-800 dark:text-slate-300 mb-2">
                      Select Template
                    </h4>
                  </div>
                  <SimpleBar class="h-[40vh] border mr-2 rounded-md">
                    <div
                      v-for="(item, i) in template"
                      :key="i"
                      @click=""
                      class="block w-full px-4 py-1 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70"
                    >
                      <div class="flex-1 text-start flex">
                        <span class="block text-slate-600 dark:text-slate-300 text-sm font-normal">
                          {{ item.label }}
                        </span>
                      </div>
                    </div>
                  </SimpleBar>
                </div>
              </div>
              <div
                class="mt-10"
                :class="stepNumber > 0 ? 'flex justify-between' : ' text-right'"
              >
                <Button
                  @click.prevent="prev()"
                  text="prev"
                  btnClass="btn-dark"
                  v-if="this.stepNumber !== 0"
                />
                <Button
                  :text="stepNumber !== this.steps.length - 1 ? 'next' : 'submit'"
                  btnClass="btn-dark"
                />
              </div>
            </form>
          </div>
    </Modal>
  </div>
</template>
<script>
import Button from "@/components/Button";
import Textinput from "@/components/Textinput";
import Breadcrumb from "@/components/Breadcrumbs";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import VueSelect from "@/components/Select/VueSelect";
import { SimpleBar } from "simplebar-vue3";

import { useChatStore } from "@/store/chat";
import { useContactListStore } from "@/store/ContactList";
import { useNumbersStore } from "@/store/number";
import { useContactStore } from "@/store/contact";
import { useTemplatesStore } from "@/store/template";

export default {
  data() {
    return {
      width: 0,
      stepNumber: 1,
      Chatmodal: false,
      aboutInfo: "Dessert chocolate cake lemon drops",
      status: "online",
      chatStatus: [
        {
          value: null,
          label: "All Chats",
          activeClass: "ring-success-500 border-success-500",
        },
        {
          value: true,
          label: "Open Chats",
          activeClass: "ring-success-500 border-success-500",
        },
        {
          value: false,
          label: "Closed Chats",
          activeClass: "ring-warning-500 border-warning-500",
        },
      ],
      numberList: [],
      contactList: [],
      contacts: [],
      template: [],
      selectedNumber: null,
      new_number: null,
      steps: [
        {
          id: 1,
          title: "Select Contact",
        },
        {
          id: 2,
          title: "Select Template",
        },
      ],
    };
  },
  methods: {
    handleResize() {
      this.width = window.innerWidth;
    },
    openNewChat() {
      this.Chatmodal = true;
    },
    closeNewChat() {
      this.Chatmodal = false;
    },
    handleNumberChange() {
      numberStore.selectedNumber = this.selectedNumber;
      console.log("handleNumberChange Enterred:", this.selectedNumber);
    },
    prev() {
      this.stepNumber--;
    },
    submit() {
      let totalSteps = this.steps.length;
      const isLastStep = this.stepNumber === totalSteps - 1;
      if (isLastStep) {
        console.log("Form Submit Called");
      } else {
        this.stepNumber++;
      }
    },
  },
  async mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  components: {
    Button,
    Breadcrumb,
    Modal,
    Select,
    VueSelect,
    Textinput,
    SimpleBar,
  },
  async created() {
    const numberStore = useNumbersStore();
    const chatStore = useChatStore();

    // Update the numbers data
    await numberStore.getNumbers;
    this.numberList = numberStore.numbers.map((number) => ({
      value: number.id,
      label: number.alias_name + " (" + number.number + ")",
    }));
    // console.log("newNumberList:", this.numberList);

    // Set the selectedNumber to the value of the first number in the list
    if (this.numberList.length > 0) {
      this.selectedNumber = this.numberList[0].value;
      chatStore.setSelectedNumber(this.selectedNumber);
      // console.log("selectedNumber :: ", this.selectedNumber);
    }

    const contactListStore = useContactListStore();

    // Update the contactList data
    await contactListStore.getContactList;
    this.contactList = contactListStore.contactlists.map((list) => ({
      value: list.id,
      label: list.name,
    }));
    // console.log("created contactList :: ", this.contactList);
    
    const contactStore = useContactStore();

    // Update the contactList data
    await contactStore.getContacts;
    this.contacts = contactStore.contacts.map((list) => ({
      value: list.id,
      label: `${list.first_name} ${list.last_name}`,
    }));
    console.log("created contacts :: ", this.contacts);
    
    const templateStore = useTemplatesStore();

    // Update the contactList data
    await templateStore.getTemplate;
    this.template = templateStore.template.map((list) => ({
      value: list.id,
      label: list.name,
    }));
    console.log("created template :: ", this.template);
  },
};
</script>
