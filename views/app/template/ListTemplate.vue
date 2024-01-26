<template>
  <div class="flex">
    <div class="flex-1">

      <SimpleBar class="h-[80vh]  mt-2">
        <TableSkeltion :count=perpage v-if="isSkeletion" />
        <vue-good-table :columns="columns" styleClass="vgt-table v-middle lesspadding2" :rows="this.templates"
          :pagination-options="{
            enabled: true,
            perPage: perpage,
          }" :sort-options="{
  enabled: false,
}" v-if="!isSkeletion" class="rounded-t-md">
          <template v-slot:table-row="props">

            <span v-if="props.column.field == 'action'">
              <div class="flex space-x-3 rtl:space-x-reverse">
                <Tooltip placement="top" arrow theme="dark">
                  <template #button>
                    <div class="action-btn" @click="showPreview(props.row.id)">
                      <Icon icon="heroicons:eye" />
                    </div>
                  </template>
                  <span> View</span>
                </Tooltip>
                <Tooltip placement="top" arrow theme="dark">
                  <template #button>
                    <div class="action-btn">
                      <Icon icon="heroicons:pencil-square" />
                    </div>
                  </template>
                  <span> Edit</span>
                </Tooltip>
              </div>
            </span>
          </template>
          <template #pagination-bottom="props">
            <div class="py-4 px-3 justify-center flex bg-white">
              <Pagination :total="this.templates.length" :current="current" :per-page="perpage" :pageRange="pageRange"
                @page-changed="current = $event" :pageChanged="props.pageChanged"
                :perPageChanged="props.perPageChanged" />
            </div>
          </template>
        </vue-good-table>
      </SimpleBar>
    </div>
    <div class="flex-0 w-[320px] ml-4 mt-2">
      <Card title="Template Preview" bodyClass="px-6 h-[80vh] py-4 shadow-sm rounded-md"
        img="https://cloud.implifie.com/assets/images/all-img/whatsapp_background.png" imaClass="rounded-md" overlay
        noborder>
        <span v-if="!isPreview">Select a template to view</span>
        <Preview v-if="isPreview" :header="{ img: templateToDisplay.header_media, text: templateToDisplay.header_text }"
          :message="templateToDisplay.body" :footer="templateToDisplay.footer" :buttons="templateToDisplay.button" />
      </Card>
    </div>



  </div>
</template>

<script>
import Icon from "@/components/Icon";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Tooltip from "@/components/Tooltip";
import Pagination from "@/components/Pagination";
import Preview from "./Preview"
import { SimpleBar } from "simplebar-vue3";
import TableSkeltion from "@/components/Skeleton/Table";
import { ref, onMounted } from 'vue';
import { getTemplatesApi } from "@/api";
import { useTemplatesStore } from '@/store/template';

export default {
  components: {
    Pagination,
    Preview,
    Card,
    Button,
    Tooltip,
    Icon,
    SimpleBar,
    TableSkeltion,
  },

  data() {
    return {
      isPreview: false,
      current: 1,
      perpage: 10,
      pageRange: 10,
      templateToDisplay: null,

      columns: [
        {
          label: "No.",
          field: "no",
        },
        {
          label: "Template Name",
          field: "name",
        },
        {
          label: "Created By",
          field: "created_by",
        },
        {
          label: "Category",
          field: "category",
        },
        {
          label: "State",
          field: "status",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      templates: [],
    };
  },
  async created() {
    const templatesStore = useTemplatesStore();
    // if (templatesStore.template.length === 0) {
    //   getTemplatesApi()
    //     .then((response) => {
    //       templatesStore.setTemplate(response);
    //       this.templates = templatesStore.template;
    //       this.updateSequence();
    //     });
    // } else {
    //   this.templates = templatesStore.template;
    // }
    await templatesStore.getTemplate; 
    this.templates = templatesStore.template;
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
    showPreview(templateId) {
      this.isPreview = true;
      const templatesStore = useTemplatesStore();
      const templateToDisplay = templatesStore.apiResponse.find(template => template.id === templateId);
      if (templateToDisplay) {
        this.templateToDisplay = templateToDisplay;
      }
    },
    updateSequence() {
      if (this.templates.length > 0) {
        this.templates.forEach((template, index) => {
          template.no = index + 1;
        });
      }
    },
  }
};
</script>
<style lang="scss">
.listview {
  th {
    @apply last:text-end;
  }
}

.action-btn {
  @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}
</style>