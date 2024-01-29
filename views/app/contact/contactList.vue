<template>
  <div>
    <TableSkeltion :count=perpage v-if="isSkeletion" class=""/>
    <SimpleBar>
      <Card className="py-4 h-[75vh] w-full" >
        <vue-good-table class="-mx-6 min " :columns="columns" styleClass=" vgt-table v-middle lesspadding2 listview"
          :rows="contacts" max-height="72vh" :fixed-header="true" :pagination-options="{
            enabled: true,
            perPage: perpage,
          }" :sort-options="{
  enabled: false,

}" v-if="!isSkeletion">
          <template v-slot:table-row="props" class="w-3/4  mx-auto" >
            <span v-if="props.column.field == 'email'" class="text-[12px] text-slate-500 lowercase dark:text-slate-300">
              {{ props.row.email }}
            </span>
            <span v-if="props.column.field == 'tags'" class="block w-full">
              <div class="flex">
                <template v-for="(tags, tagIndex) in props.row.tags" :key="tagIndex">
                  <div class="px-2 py-1 mr-1 bg-gray-200 text-gray-800 rounded">
                    {{ props.row.tags.value }}
                  </div>
                  <span v-if="tagIndex !== props.row.tags.length - 1"></span>
                </template>
              </div>
            </span>
            <span v-if="props.column.field == 'lastmessageDate'">
              
            </span>
            <span v-if="props.column.field == 'lastmessageTime'" class="text-slate-500 dark:text-slate-300">
              
              {{ props.row.lastmessageDate }} {{ props.row.lastmessageTime }}
            </span>
            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems=" w-[140px]">
              <span class="text-xl"
                ><Icon icon="heroicons-outline:dots-vertical"
              /></span>
              <template v-slot:menus>
                <MenuItem v-for="(item, i) in actions" :key="i">
                  <div 
                    :class="`
                
                  ${
                    item.name === 'delete'
                      ? 'bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white'
                      : 'hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50'
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `
                  
                  " @click.prevent="handleActionClick(item, props.row)">
                    <span class="text-base"><Icon :icon="item.icon" /></span>
                    <span>{{ item.name }}</span>
                  </div>
                </MenuItem>
              </template>
            </Dropdown>
            </span>
          </template>
          <template #pagination-bottom="props">
            <div class="py-3 px-3 justify-center flex">
              <Pagination :total="contacts.length" :current="current" :per-page="perpage" :pageRange="pageRange"
                @page-changed="current = $event" :pageChanged="props.pageChanged"
                :perPageChanged="props.perPageChanged" />
            </div>
          </template>
        </vue-good-table>
      </Card>
    </SimpleBar>
  </div>
             <Modal
             :activeModal="showModal"
             @close="closeUpdate()"
              title="Edit Profile">
              <contactProfile :contacts="contacts" />
               </Modal>
</template>
<script>
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import Pagination from "@/components/Pagination";
import { MenuItem } from "@headlessui/vue";
import TableSkeltion from "@/components/Skeleton/Table";
import { SimpleBar } from "simplebar-vue3";
import { ref, onMounted } from 'vue';
import { useContactStore } from "@/store/contact";
import contactProfile from "./contactProfile.vue"
import Modal from "@/components/Modal";

export default {
  components: {
    Pagination,
    Dropdown,
    Icon,
    MenuItem,
    Card,
    Tooltip,
    TableSkeltion,
    SimpleBar,
    contactProfile,
    Modal 
  },

  data() {
    return {
      current: 1,
      perpage: 10,
      pageRange: 10,
      // id:"",
      // showModal:"",
      
      actions: [
        {
          name: "View",
          icon: "heroicons:eye",
          theme: "dark",
          doit: () => {
            this.$router.push({ name: "project-details" });
          },
        },
        {
          name: "Edit",
          icon: "heroicons:pencil-square",
          theme: "dark",
          
        },
        {
          name: "Delete",
          icon: "heroicons-outline:trash",
          theme: "danger-500",
          doit: (data) => {
            this.removeProject(data)
          },
        },
      ],

      columns: [
        {
          label: "No",
          field: "no",
        },
        {
          label: "First Name",
          field: "first_name",
        },
        {
          label: "Last Name",
          field: "last_name",
        },
        {
          label: "Phone Number",
          field: "phone",
        },

        {
          label: "Email Address",
          field: "email",
        },

        {
          label: "Tags",
          field: "tags",
        },
        {
          label: "Create On",
          field: "lastmessageDate",
        },
        {
          label: "Last Activity",
          field: "lastmessageTime",
        },
        {
          label: "Action",
          field: "action",
        },
       
      ],
      contacts: [],
    };
  },
  async created() {

    const contactStore = useContactStore();
    await contactStore.fetchContact();

    this.contacts = contactStore.contacts;
    this.updateSequence();


  },
  setup() {
    const isSkeletion = ref(true);
    let handleActionClick = ref(true);
    const showModal = ref(false);
    const contactStore = useContactStore();
    const contacts = ref([]);
    const id = ref("")

     handleActionClick = (item, contact) => {
      console.log('Contact:', contact);

      if (contact && item.name === 'Edit') {
        showModal.value = true;
        id.value = contact.id; // Pass the contact id to the modal
      } else if (item.name === 'delete') {
        // Handle delete action
      } else {
        // Handle other actions
      }
    }

    
    

    onMounted(async() => {
      setTimeout(() => {
        isSkeletion.value = false;
      }, 1000);

      if (contactStore.contacts.length === 0) {
        await contactStore.fetchContactId();
      }
      
      contacts.value = contactStore.contacts;
 })


 const closeUpdate = () => {
  console.log('Closing modal');
      showModal.value= false;
      id.value= ""; // Reset id when closing modal
    };
    return {
      isSkeletion,
      handleActionClick,
      showModal,
      closeUpdate,
      contacts,
      id
     // Return isSkeletion in the setup function
    };
  },
  methods: {  
    updateSequence() {
      if (this.contacts.length > 0) {
        this.contacts.forEach((contact, index) => {
          contact.no = index + 1;
        });
      }
    },

    
    
  },
 
  }
  

</script>
<style lang="scss">
.listview {
  th {
    @apply last:text-end;
  }
}
</style>
  
