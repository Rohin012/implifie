<template>
    <div>
      <div class="flex flex-wrap justify-between">
        <Breadcrumb />
  
        <div class="md:flex md:space-x-4 md:justify-end items-start rtl:space-x-reverse" :class="width < 768 ? 'space-x-rb' : ''">
          
          <Button
            icon="heroicons-outline:filter"
            text="Filter"
            btnClass="bg-white hover:bg-slate-900 hover:text-white btn-md h-min text-sm font-normal"
            iconClass=" text-lg mr-2"
          />
          <Button
            icon="heroicons-outline:plus"
            text="Add Contact"
            btnClass="btn-dark dark:bg-slate-800 h-min btn-md text-sm font-normal"
            iconClass=" text-lg mr-2"
            @click="openContact"
          />
        </div>
      </div>
      
      <Modal
        :activeModal="contactmodal"
        @close="closeContact"
        title="Create Contact"
        class="h-[50vh]"
      >
        <ContactAddmodal />
      </Modal>

      <div class="flex">
      <SimpleBar class="sidebar-menu px-4 py-2 w-48 h-[75vh] bg-white rounded-md shadow-sm">
        <Navmenu :items="menuItems" />
        <!-- <span class="text-sm font-semibold ml-2">Create New List</span>
        <Button text="Create New List" btnClass="btn -mx-3" /> -->
        <button class="flex text-sm text-slate-600 font-medium mt-2 ml-3" 
          @click="openContactList">
          <Icon icon="heroicons-outline:plus" class="mt-1 mr-2" /> Create New List
        </button>
      </SimpleBar>

      <div class="flex-1">
        <SimpleBar class="flex-1 ml-3 px-6 py-4 h-[75vh] bg-white rounded-md shadow-sm">
          <ContactList/>
        </SimpleBar>
      </div>
    </div>

    <Modal
      :activeModal="contactListModal"
      @close="closeContactList"
      title="Create Contact List"
      class="h-[50vh]"
    >
      <ContactGroup  />
    </Modal>
  
      <!-- <updateModal /> -->
    </div>
  </template>
  
  <script setup>
  import Navmenu from "@/components/Sidebar/Navmenu";
  import { SimpleBar } from "simplebar-vue3";
  import Breadcrumb from "@/components/Breadcrumbs";
  import Button from "@/components/Button";
  import Modal from "@/components/Modal";
  import { computed, ref, onMounted } from "vue";
  import ContactAddmodal from "./addContact";
  import ContactList from "./contactList";
  import ContactGroup from "./contactGroup";
  import Icon from "@/components/Icon";
   
  const menuItems = [
    {
      title: "All Contacts",
      link: "contact",
    },
    {
      title: "Contact List",
      open: true,
      child: [
        {
          childtitle: "Analytics Dashboard",
          childlink: "home",
        },
      ]
    }
  ];

  const contactmodal = ref(false);

  const openContact = () => {
    contactmodal.value = true;
  };

  const closeContact = () => {
    contactmodal.value = false;
  };
  
  const contactListModal = ref(false);

  const openContactList = () => {
    contactListModal.value = true;
  };

  const closeContactList = () => {
    contactListModal.value = false;
  };

  
  const width = ref(0);
  const handleResize = () => {
    width.value = window.innerWidth;
  };
  onMounted(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  });
  
  const contacts = computed(() => store.contacts);
  
  
  
  
  </script>
  <style lang=""></style>
  