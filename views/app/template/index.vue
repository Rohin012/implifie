<template>
  <div>
    <!-- <div class="flex justify-between">
      <div class="flex justify-between w-40">
        <Breadcrumb />
      </div>

      <div class="md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse">
        <Button icon="heroicons-outline:plus" text="Add Template" btnClass="btn-dark h-min btn-md text-sm font-normal"
          iconClass=" text-lg" link="template/create/" />
      </div>
    </div> -->

    <TabGroup>
      <div class="flex justify-between">
        <div class="flex justify-between items-center">
          <TabList class="lg:space-x-8  md:space-x-4 space-x-0 rtl:space-x-reverse">
            <Tab v-slot="{ selected }" as="template" v-for="(item, i) in buttons" :key="i">
              <button :class="[
                selected
                  ? 'text-primary-500 before:w-full'
                  : 'text-slate-500 before:w-0 dark:text-slate-300',
              ]"
                class="text-md font-semibold capitalize ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2">
                {{ item.title }}
              </button>
            </Tab>
          </TabList>
        </div>

        <div class="justify-end">
          <Button icon="heroicons-outline:plus" text="Add Template" btnClass="btn-dark h-min text-sm font-normal"
            iconClass=" text-lg" link="template/create/" />
        </div>
      </div>
      <!-- <div class="flex flex-wrap justify-between items-center mb-4">
        <TabList class="pt-2 lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
          <Tab v-slot="{ selected }" as="template" v-for="(item, i) in buttons" :key="i">
            <button :class="[
              selected
                ? 'text-primary-500 before:w-full'
                : 'text-slate-500 before:w-0 dark:text-slate-300',
            ]"
              class="text-md font-semibold capitalize ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2">
              {{ item.title }}
            </button>
          </Tab>
        </TabList>
      </div> -->
      <TabPanels>
        <TabPanel>
          <TemplateLibrary />
        </TabPanel>
        <TabPanel>
          <!-- <div class="space-x-6 overflow-hidden overflow-x-auto pb-4 rtl:space-x-reverse"> -->
          <ListTemplate />
          <!-- </div> -->
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
<script setup>
import Breadcrumb from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import { useKanbanStore } from "@/store/kanban";
import TemplateLibrary from "./TemplateLibrary";
import ListTemplate from "./ListTemplate";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { ref } from "vue";

const store = useKanbanStore();
const buttons = [
  {
    title: "Template Library",
  },
  {
    title: "My Templates",
  },
];

</script>