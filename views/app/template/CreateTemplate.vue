<template>
  <div>
    <div class="flex justify-between">
      <div class="flex justify-between">
        <Breadcrumb />
      </div>

      <div class="md:flex md:space-x-4 md:justify-end items-top rtl:space-x-reverse">
        <Button icon="heroicons-outline:x-mark" text="Cancel" btnClass="btn-outline-dark h-min text-sm font-normal"
          iconClass="mr-2 text-md" @click="cancel" />
      </div>
    </div>
  <div class="flex">
    <SimpleBar class="flex-none w-[75%] h-[78vh] shadow-sm"> 
      <Card>
        <TemplateForm
          :showPreviewButton="true"
          @forminputchange="updatePreview" />
      </Card>
    </SimpleBar>
    <div class="flex-0 w-[320px] ml-4">
        <Card 
          title="Template Preview" 
          bodyClass="px-6 h-[60vh] py-4 shadow-sm rounded-md"
          img="https://cloud.implifie.com/assets/images/all-img/whatsapp_background.png"
          imaClass="rounded-md"
          overlay
          noborder
        >
            <Preview
              :header_type="preview.header_type"
              :header_text="preview.header_text"
              :header_text_sample="preview.header_text_sample"
              :header_media="preview.header_media"
              :body="preview.body"
              :body_sample="preview.body_sample"
              :footer="preview.footer"
              :buttons="preview.buttons"
            />
            </Card>          
        </div>
  </div>
  </div>
</template>

<script>
import TemplateForm from "./TemplateForm.vue";
import Breadcrumb from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { SimpleBar } from "simplebar-vue3";
import { useRouter } from 'vue-router';
import Preview from "./Preview";

export default {
  components: {
    TemplateForm,
    Button,
    Card,
    SimpleBar,
    Preview,
    Breadcrumb,
  },
  data() {
    return {
      preview: {
        header_type: "",
        header_text: "",
        header_text_sample: "",
        header_media: "",
        body: "",
        body_sample: [],
        footer: "",
        buttons: {}
      },
    };
  },
  methods: {
    updatePreview(data) {
      console.log("Create Template updatePreview data :: ", data);
      // Update the preview data based on user input
      this.preview = data;
      console.log("Create Template updatePreview this.preview :: ", this.preview);
    },
  },
  setup() {
    const router = useRouter();
    const cancel = () => {
      router.push('/app/template');
    };
    return { cancel };
  },
}

</script>