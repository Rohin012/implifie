<template>
  <div>
    <TabGroup>
      <TabList class="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
        <Tab v-slot="{ selected }" as="template" v-for="(item, i) in buttons" :key="i">
          <button :class="[
            selected
              ? 'text-primary-500 before:w-full'
              : 'text-slate-500 before:w-0 dark:text-slate-300',
          ]"
            class="text-sm font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2">
            {{ item.title }}
          </button>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <!-- Create Contact -->
          <div class="text-slate-600 dark:text-slate-400 text-sm font-normal h-[50vh]">
            <form @submit.prevent="addContact">
              <div class="grid grid-cols-2 gap-5">
                <Textinput label="first name" type="text" placeholder="First Name" name="first_name"
                  classInput="w-full mt-1" v-model="first_name" :error="fnameError" />
                <Textinput label="last name" type="text" placeholder="Last Name" name="last_name" classInput="w-full mt-1"
                  v-model="last_name" :error="lnameError" />
                <Textinput label="phone number" type="text" placeholder="Phone Number"
                  description="Enter the phone number for the contact. Add Prefix Before The Phone Number. Eg. +91"
                  name="phone" class="col-span-2" classInput="w-[48%] mt-1" v-model="phone" :error="phoneError" />
                <Textinput label="email address" type="email" placeholder="Email Address" name="email"
                  classInput="w-full mt-1" v-model="email" :error="emailError" />

                <VueSelect :options="options" label="Tag" placeholder="Assign a Tag" />
                
              </div>

              <div class="text-right pt-10">
                <Button text="Add Contact" btnClass="btn-dark"></Button>
              </div>
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
            <!-- File Upload -->
            <Dropzone />
            <div class="text-right pt-5">
              <Button text="Add" btnClass="btn-dark"></Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
            Coming Soon
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import Button from "@/components/Button";
import VueSelect from "@/components/Select/VueSelect";
import Textinput from "@/components/Textinput";
import Dropzone from "@/components/DropZone";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { useField, useForm } from "vee-validate";
import { useContactStore } from "@/store/contact";
import * as yup from "yup";

const options = [
  {
    value: "team",
    label: "team",
  },
  {
    value: "low",
    label: "low",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "high",
    label: "high",
  },
];

const schema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phone: yup.number().required(" Phone number is required").positive().integer().min(11),
  email: yup.string().required(" Email is required").email(),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: first_name, errorMessage: fnameError } = useField("first_name");
const { value: last_name, errorMessage: lnameError } = useField("last_name");
const { value: phone, errorMessage: phoneError } = useField("phone");
const { value: email, errorMessage: emailError } = useField("email");

const addContact = handleSubmit(async () => {
  const formData = {
    first_name: first_name.value,
    last_name: last_name.value,
    phone: phone.value,
    email: email.value,
    source: ""
  };

  const contactStore = useContactStore();
  await contactStore.createContact(formData);
});

const buttons = [
  {
    title: "Create Contact",
  },
  {
    title: "Upload CSV",
  },
  {
    title: "Integration",
  },
];
</script>
<style lang=""></style>
  