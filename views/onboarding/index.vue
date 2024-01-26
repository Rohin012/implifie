<template>
  <div>
    <SimpleBar class="flex-1 h-[85vh] rounded-md">
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <Card bodyClass="px-8 py-4 shadow-sm">
          <div class="grid grid-cols-6 gap-1">
            <!-- <div class="flex-0"> -->
              <div class="w-[80px] my-6 mx-3">
                <Icon icon="heroicons:building-storefront" class="text-4xl" />
              </div>
            <!-- </div> -->
            <!-- <div class="flex-0"> -->
            <div class="col-span-3">
              <div class="space-x-5">
                <span class="inline-block font-medium text-base">Add Your Business Information</span>
              </div>
              <div class="text-sm">
                Add your business information here. This information will help us register your business with Whatsapp.
              </div>
            </div>
            <!-- <div class="flex-1 mt-5"> -->
            <div class="my-5 col-span-2 ">
              <Button text="Add Business Information" btnClass="btn-dark" @click="openCreateBusiness" />
              <Modal
              :activeModal="addmodal"
              @close="closeCreateBusiness"
              title="Create Business Profile">
                <BusinessProfile isNew />
            </Modal>
            </div>
          </div>
        </Card>
        <Card bodyClass="px-8 py-4 shadow-sm">
          <div class="grid grid-cols-6 gap-1">
            <!-- <div class="flex-0"> -->
              <div class="w-[80px] my-5 mx-3 justify-end">
                <img width="48" height="48" src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp--v1" />
              </div>
            <!-- </div> -->
            <!-- <div class="flex-0"> -->
            <div class="col-span-3">
              <div class="space-x-5">
                <span class="inline-block font-medium text-base">Connect To Whatsapp Business</span>
              </div>
              <div class="text-sm">
                Explore Implifie using +180018001800 as your demo WhatsApp Business Number.
              </div>
            </div>
            <!-- <div class="flex-1 mt-5"> -->
            <div class="my-5 col-span-2">
            <Button text="Connect Your Number" btnClass="btn-dark" link="connect"></Button>
            
            </div>
          </div>
        </Card>
        
      </div>
      <div class="flex mt-4 space-x-5 overflow-hidden relative rtl:space-x-reverse">
        <Card title="Explore Implifie's Features" bodyClass="px-8 py-4 shadow-sm" className="w-full">
          <TabGroup>
            <div class="flex">
              <div class="flex-none w-96 p-3 border rounded-md">
                <TabList class="flex flex-col space-y-1 text-start items-start gap-1">
                  <Tab v-for="(item, i) in faqmenus" :key="i" v-slot="{ selected }" as="template">
                    <button type="button"
                      class="focus:ring-0 focus:outline-none space-x-2 flex border w-full transition duration-150 px-3 py-3 rounded-[6px] rtl:space-x-reverse"
                      :class="selected
                        ? 'bg-slate-100 dark:bg-slate-900 dark:text-white font-medium'
                        : 'bg-white dark:bg-slate-800 dark:text-slate-300'
                        ">
                      <!-- <span> {{ item.title }}<br/>{{ item.subtitle }}</span> -->
                      <div class="flex">
                        <div class="flex-none w-80">
                          <div class="text-md text-left">{{ item.title }}</div>
                          <div class="text-sm text-left">{{ item.subtitle }}</div>
                        </div>
                        <div class="flex-1 justify-end mt-3">
                          <Icon icon="heroicons:chevron-right" class="text-lg"
                            :class="selected ? ' opacity-100' : 'opacity-50 dark:opacity-100'" />
                        </div>
                      </div>
                    </button>
                  </Tab>
                </TabList>
              </div>
              <div class="flex-1 w-full ml-3 bg-slate-100 border rounded-md">
                <TabPanels>
                  <TabPanel>
                    <div class="text-slate-600 p-4 dark:text-slate-400 text-md font-normal">

                      <div class="flex-auto text-xl text-slate-800 font-semibold pb-2">
                        See how automated replies work!
                      </div>
                      <div class="flex">
                        <div class="flex-0 flex-0 bg-slate-300 rounded-xl px-2">1</div>
                        <div class="flex-1 ml-4">Send the message</div>
                      </div>
                      <div class="flex ml-10">
                        <div class="flex-none">
                          <img src="https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg" width="150"
                            height="150" alt="">
                          <span class="text-xs text-slate-400">Scan to send it via your mobile</span>
                        </div>
                        <div class="flex-none mx-10 my-14">
                          OR
                        </div>
                        <div class="flex-1 my-12">
                          <Button text="Open WhatsApp Web" btnClass="btn-dark"></Button>
                        </div>
                      </div>
                      <div class="flex">
                        <div class="flex-0 flex-0 bg-slate-300 rounded-xl px-2">2</div>
                        <div class="flex-1 ml-4">Once you receive a reply, click on the button and select an FAQ ti view
                          automated replies.</div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div class="text-slate-600 p-4 dark:text-slate-400 text-md font-normal">
                      <div class="text-xl text-slate-800 font-semibold pb-2">
                        See how WhatsApp catalog browsing works!
                      </div>
                      <div class="flex py-1">
                        <div class="flex-0 bg-slate-300 rounded-xl px-2">1</div>
                        <div class="flex-1 ml-4">In the list message that you got earlier, select ‘View products’.</div>
                      </div>
                      <div class="flex py-1">
                        <div class="flex-0 bg-slate-300 rounded-xl px-2">2</div>
                        <div class="flex-1 ml-4">Select a collection of your choice</div>
                      </div>
                      <div class="flex py-1">
                        <div class="flex-0 bg-slate-300 rounded-xl px-2">3</div>
                        <div class="flex-1 ml-4">The catalog for that collection will be sent automatically! The same will
                          happen for other collections as well.</div>
                      </div>
                    </div>

                  </TabPanel>
                  <TabPanel>
                    <div class="text-slate-600 p-4 dark:text-slate-400 text-md font-normal">
                      <div class="text-xl text-slate-800 font-semibold pb-2">
                        See how automated WhatsApp checkout works!
                      </div>
                      <div class="flex py-1">
                        <div class="flex-0 bg-slate-300 rounded-xl px-2">1</div>
                        <div class="flex-1 ml-4">Select some products in the catalog message that you received. And send a
                          WhatsApp cart.</div>
                      </div>
                      <div class="flex py-1">
                        <div class="flex-0 bg-slate-300 rounded-xl px-2">2</div>
                        <div class="flex-1 ml-4">You'll be asked to confirm the Cash on Delivery order, after which an
                          order
                          confirmation notification will be sent. </div>
                      </div>
                      <div class="flex py-1">
                        <div class="flex-0 bg-slate-300 rounded-xl px-2">3</div>
                        <div class="flex-1 ml-4">
                          All orders initiated or placed via this checkout workflow will appear in the order panel. Go to
                          Order Panel</div>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </div>
            </div>
          </TabGroup>
        </Card>
      </div>
      <Card title="Explore Implifie's Features" bodyClass="px-8 py-4 shadow-sm" className="w-full mt-4">
        <SimpleBar class="flex-1 h-[10vh]">
        <div class="flex">
          <div class="flex-0">
            <button type="button"
              class="focus:ring-0 focus:outline-none w-80 space-x-2 flex border transition duration-150 px-3 py-3 rounded-[6px]">
              <div class="flex">
                <div class="flex-0">
                  <div class="w-[65px]">
                    <img width="48" height="48" src="https://img.icons8.com/color/48/whatsapp--v1.png"
                      alt="whatsapp--v1" />
                  </div>
                </div>
                <div class="flex-0 justify-items-start">
                  <div class="space-x-5">
                    <span class="inline-block font-medium text-base">Add WhatsApp Contacts</span>
                  </div>
                  <div class="text-sm">Manage contacts efficiently</div>
                </div>
              </div>
            </button>
          </div>
          <div class="flex-0 ml-3">
            <button type="button"
              class="focus:ring-0 focus:outline-none w-80 space-x-2 flex border transition duration-150 px-3 py-3 rounded-[6px]">
              <div class="flex">
                <div class="flex-0">
                  <div class="w-[65px]">
                    <img width="48" height="48" src="https://img.icons8.com/color/48/whatsapp--v1.png"
                      alt="whatsapp--v1" />
                  </div>
                </div>
                <div class="flex-0 justify-items-start">
                  <div class="space-x-5">
                    <span class="inline-block font-medium text-base">Add Team Members</span>
                  </div>
                  <div class="text-sm">Manage member permissions</div>
                </div>
              </div>
            </button>
          </div>
          <div class="flex-0 ml-3">
            <button type="button"
              class="focus:ring-0 focus:outline-none w-80 space-x-2 flex border transition duration-150 px-3 py-3 rounded-[6px]">
              <div class="flex">
                <div class="flex-0">
                  <div class="w-[65px]">
                    <img width="48" height="48" src="https://img.icons8.com/color/48/whatsapp--v1.png"
                      alt="whatsapp--v1" />
                  </div>
                </div>
                <div class="flex-0 justify-items-start">
                  <div class="space-x-5">
                    <span class="inline-block font-medium text-base">Explore Integrations</span>
                  </div>
                  <div class="text-sm">Link GSheets, FB forms & more</div>
                </div>
              </div>
            </button>
          </div>
          <div class="flex-0 ml-3">
            <button type="button"
              class="focus:ring-0 focus:outline-none w-80 space-x-2 flex border transition duration-150 px-3 py-3 rounded-[6px]">
              <div class="flex">
                <div class="flex-0">
                  <div class="w-[65px]">
                    <img width="48" height="48" src="https://img.icons8.com/color/48/whatsapp--v1.png"
                      alt="whatsapp--v1" />
                  </div>
                </div>
                <div class="flex-0 justify-items-start">
                  <div class="space-x-5">
                    <span class="inline-block font-medium text-base">APIs & Webhooks</span>
                  </div>
                  <div class="text-sm">Create custom integrations</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </SimpleBar>
      </Card>
    </SimpleBar>
  </div>
</template>

<script>
import { SimpleBar } from "simplebar-vue3";
import Breadcrumb from "@/components/Breadcrumbs";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";

import BusinessProfile from "@/views/app/settings/BusinessProfile";
import FBconnect from "./FBconnect";

export default {
  components: {
    SimpleBar,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Breadcrumb,
    Card,
    Button,
    FBconnect,
    Icon,
    Modal,
    BusinessProfile,
  },
  data() {
    return {
      addmodal: false,
      faqmenus: [
        {
          title: "Automate WhatsApp replies",
          subtitle: "Clear common queries with zero effort",
        },
        {
          title: "Automate WhatsApp catalog browsing",
          subtitle: "Convert visitors into prospective buyers",
        },
        {
          title: "Automate WhatsApp checkout",
          subtitle: "Turn prospective buyers into paid customers",
        },
        {
          title: "Automate WhatsApp notifications",
          subtitle: "Delight customers at every stage of their journey",
        },
      ],
    }
  },
  methods: {
    openCreateBusiness() {
      this.addmodal = true;
    },
    closeCreateBusiness() {
      this.addmodal = false;
    },
  }
}

</script>
