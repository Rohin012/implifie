<template>
  <div>
    <Card className="py-4 h-[75vh] w-full">
      <TabGroup>
        <div class="flex justify-center">
          <TabList class="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
            <Tab v-for="(item, i) in buttons" :key="i" class="mb-4">
              <div @click.prevent="handleTabClick(i)" :class="[
                selectedTabIndex === i
                  ? 'text-primary-500 before:w-full'
                  : 'text-slate-500 before:w-0 dark:text-slate-300',
              ]"
                class="text-sm font-medium capitalize bg-white dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 before:-translate-x-1/2">
                {{ item.title }}
              </div>
            </Tab>
          </TabList>
        </div>
        <TabPanels>
          <TabPanel v-if="selectedTabIndex === 0">
            <div class="conten-box mx-8">
              <SimpleBar>
                <form>

                  <div class="grid grid-cols-2 gap-5">
                    <div class="col-span-2">
                      <h4 class="text-base text-slate-800 dark:text-slate-300 text-lg">
                        Broadcast Details
                      </h4>
                    </div>
                    <Textinput label="Broadcast Name" classInput="w-3/4" type="text" placeholder="Broadcast Name"
                      name="fullname" description="Enter a name for this broadcast" />

                    <VueSelect :options="numbers" label="Select Whatsapp Number" classInput="w-3/4"
                      :placeholder="`Select Whatsapp Number`"
                      description="The selected Whatsapp number will be used to send out the broadcast messages" />

                    <VueSelect :options="hours" label="Working Hours" classInput="w-3/4"
                      :placeholder="`Select Working Hours`"
                      description="The selected time slot will be used to send out the broadcast messages" />
                  </div>
                  <div class=" mt-6 grid grid-cols-1 gap-5">
                    <h4 class="text-base text-slate-800 dark:text-slate-300 text-lg">
                      Select Your Target Audience
                    </h4>
                    <div class="flex">
                      <div class="flex-0 w-1/4">
                        <VueSelect :options="contacts" label="Contact List" :placeholder="`Select Contact List`"
                          description="The contacts from the selected List will contacted by this broadcast" />
                      </div>
                      <div
                        class="mx-10 my-10 bg-slate-300 text-black ring-slate-300 h-7 w-7 rounded-full flex flex-col items-center justify-center relative z-[66] ring-2 text-md text-base font-medium">
                        <span>OR</span>
                      </div>
                      <div class="flex-0 w-1/4">
                        <label class="inline-block input-label" for="upload">Upload your contact list</label>
                        <Fileinput filenametag />
                      </div>
                    </div>
                  </div>

                </form>
                <div class="flex justify-end">
                  <Button text="Select Template" btnClass="btn-dark" icon="heroicons-outline:arrow-right"
                    iconClass="text-lg ml-2" iconPosition="right" @click="handleNextButtonClick" />
                </div>
              </SimpleBar>
              
            </div>
          </TabPanel>
          <TabPanel v-if="selectedTabIndex === 1">
            <div class="conten-box mx-8">
              <div class=" mt-6 grid grid-cols-1 gap-5">
                <h4 class="text-base text-slate-800 dark:text-slate-300 text-lg">
                  Select Your Broadcast Message
                </h4>
                <div class="flex">
                  <div class="flex-0 w-1/4">
                    <VueSelect :options="templates" label="Templates" :placeholder="`Select Templates`"
                      description="The selected template will be sent to your contacts" />
                  </div>
                  <div
                    class="mx-10 my-10 bg-slate-300 text-black ring-slate-300 h-7 w-7 rounded-full flex flex-col items-center justify-center relative z-[66] ring-2 text-md text-base font-medium">
                    <span>OR</span>
                  </div>
                  <div class="flex-0 w-1/4 my-7">
                    <Modal title="Create New Template" label="Create New Template" labelClass="btn-md btn-dark"
                      :isOpen="isModalOpen" @close="closeModal" sizeClass="max-w-5xl">
                      <SimpleBar>
                        <TemplateForm />
                      </SimpleBar>
                    </Modal>
                  </div>

                </div>
              </div>
              <div class="flex justify-end space-x-4">
                <Button text="Broadcast Details" btnClass="btn-outline-dark" icon="heroicons-outline:arrow-left"
                  iconClass="text-lg mr-2" @click="handlePreviousButtonClick" />
                <Button text="Select Template" btnClass="btn-dark" icon="heroicons-outline:arrow-right"
                  iconClass="text-lg ml-2" iconPosition="right" @click="handleNextButtonClick" />
              </div>
            </div>
          </TabPanel>
          <TabPanel v-if="selectedTabIndex === 2">
            <div class="conten-box mx-8">
              <div class="text-slate-600 dark:text-slate-400 text-sm font-normal">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui
              </div>
              <div class="flex justify-end space-x-4">
                <Button text="Select Template" btnClass="btn-outline-dark" icon="heroicons-outline:arrow-left"
                  iconClass="text-lg mr-2" @click="handlePreviousButtonClick" />
                <Button text="Save Broadcast" btnClass="btn-dark" @click="handleNextButtonClick" />
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>

    </Card>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import Button from "@/components/Button";
import Modal from '@/components/Modal/Modal';
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import VueSelect from "@/components/Select/VueSelect";
import Fileinput from "@/components/Fileinput";
import TemplateForm from "@/views/app/template/TemplateForm.vue";
import { SimpleBar } from "simplebar-vue3";
import { useNumbersStore } from '@/store/number';
import { useTemplatesStore } from '@/store/template';
import { computed, ref } from "vue";

export default {
  components: {
    Card,
    Button,
    Modal,
    Icon,
    InputGroup,
    Textarea,
    Textinput,
    VueSelect,
    Fileinput,
    TemplateForm,
    SimpleBar,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  data() {
    return {
      selectedTabIndex: 0,
      numbers: [],
      templates: [],
      buttons: [
        {
          title: "1. Broadcast Details",
        },
        {
          title: "2. Select Template",
        },
        {
          title: "3. Broadcast Preview",
        },
      ],
    }
  },
  methods: {
    handleTabChange(index) {
      // Handle tab change
      this.selectedTabIndex = index;
    },
    handleNextButtonClick() {
      // Move to the next tab
      this.selectedTabIndex = (this.selectedTabIndex + 1) % this.buttons.length;
    },
    handlePreviousButtonClick() {
      // Move to the previous tab
      this.selectedTabIndex = (this.selectedTabIndex - 1 + this.buttons.length) % this.buttons.length;
    },
  },
  setup() {
    const isModalOpen = ref(false);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };
    return {
      isModalOpen,
      openModal,
      closeModal,
      hours: [
        {
          value: "Orange",
          label: "Orange",
        },
        {
          value: "Apple",
          label: "Apple",
        },
        {
          value: "Banana",
          label: "Banana",
        },
      ],
      contacts: [
        {
          value: "Orange",
          label: "Orange",
        },
        {
          value: "Apple",
          label: "Apple",
        },
        {
          value: "Banana",
          label: "Banana",
        },
      ],
      templates: [
        {
          value: "Orange",
          label: "Orange",
        },
        {
          value: "Apple",
          label: "Apple",
        },
        {
          value: "Banana",
          label: "Banana",
        },
      ],
    }
  },
  async created() {
    const numbersStore = useNumbersStore();

    // Update the numbers data in the table
    await numbersStore.getNumbers;
    const numbersData = numbersStore.numbers;
    console.log("numbersData", numbersData);

    this.numbers = numbersData.map(item => ({
      id: item.id,
      value: item.alias_name,
      label: `${item.number} - [ ${item.alias_name} ]`,
    }));
    console.log("numbers :: ", this.numbers);
  },
}
</script>