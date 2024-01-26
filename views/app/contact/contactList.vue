<template>
  <div>
    <TableSkeltion :count=perpage v-if="isSkeletion" />
    <SimpleBar>
      <Card noborder>
        <vue-good-table class="-mx-6 " :columns="columns" styleClass=" vgt-table v-middle lesspadding2 listview"
          :rows="contacts" max-height="72vh" :fixed-header="true" :pagination-options="{
            enabled: true,
            perPage: perpage,
          }" :sort-options="{
  enabled: false,

}" v-if="!isSkeletion">
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'email'" class="text-slate-500 lowercase dark:text-slate-300">
              {{ props.row.email }}
            </span>
            <span v-if="props.column.field == 'tags'" class="block w-full">
              <div class="flex">
                <template v-for="(tag, tagIndex) in props.row.tags" :key="tagIndex">
                  <div class="px-2 py-1 mr-1 bg-gray-200 text-gray-800 rounded">
                    {{ tag }}
                  </div>
                  <span v-if="tagIndex !== props.row.tags.length - 1"></span>
                </template>
              </div>
            </span>
            <span v-if="props.column.field == 'createDate'">
              {{ props.row.createDate }}
            </span>
            <span v-if="props.column.field == 'lastActivity'" class="text-slate-500 dark:text-slate-300">
              {{ props.row.lastActivity }}
            </span>
            <span v-if="props.column.field == 'action'">
              <div class="space-x-3">
                <Tooltip placement="top" arrow :theme="action.theme" btnClass="my-3" v-for="(action, i) in actions">
                  <template #button>
                    <div class="action-btn">
                      <Icon :icon="action.icon" />
                    </div>
                  </template>
                  <span> {{ action.name }}</span>
                </Tooltip>
              </div>
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
  },

  data() {
    return {
      current: 1,
      perpage: 10,
      pageRange: 10,
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
          doit: (data) => {
            this.updateProject(data);
          },
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
          field: "createDate",
        },
        {
          label: "Last Activity",
          field: "lastActivity",
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
    await contactStore.getContacts;

    this.contacts = contactStore.contacts;
    this.updateSequence();

  },
  setup() {
    const isSkeletion = ref(true);

    onMounted(() => {
      setTimeout(() => {
        isSkeletion.value = false;
      }, 1000);
    });

    return {
      isSkeletion, // Return isSkeletion in the setup function
    };
  },
  methods: {  
    updateSequence() {
      if (this.contacts.length > 0) {
        this.contacts.forEach((contact, index) => {
          contact.no = index + 1;
        });
      }
    }
  }
};
</script>
<style lang="scss">
.listview {
  th {
    @apply last:text-end;
  }
}
</style>
  