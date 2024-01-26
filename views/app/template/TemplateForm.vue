<template>
  <div>
    <div class="my-4 grid lg:grid-cols-2 grid-cols-1 gap-3">
      <Textinput label="Template Name" name="templatename" type="text" placeholder="Template Name" classInput="w-full"
        v-model="name" :error="nameError" />
      <div class="grid grid-cols-2 gap-5">
        <Select label="Category" :options="category" v-model="selectedCategory" :error="categoryError" />
        <Select label="Language" :options="languages" v-model="selectedLanguage" :error="languageError" />
      </div>
      <div class="grid grid-cols-4 gap-5 lg:col-span-2">
        <Select label="Header Type (optional)" name="header" :options="header" v-model="selectedHeader"
          description="Showcase Your Brand With Striking Visuals Or Text To Make It Stand Out." />
        <Textinput label="Header Value" type="text" :placeholder="(headerValue === 'NONE') ?
          'Select a Header Type to add a Header' :
          'Write the message header here'" classInput="w-full" class="col-span-2" :disabled="headerValue === 'NONE'"
          v-if="selectedHeader === 'NONE' || selectedHeader === 'TEXT'" v-model="headerText" />
        <Button v-if="selectedHeader === 'NONE' || selectedHeader === 'TEXT'" :disabled="headerValue === 'NONE' || showAddVariableHeader"
          text="Add Variable"
          class="my-6 inline-flex items-center justify-center h-10 w-40 bg-slate-900 text-lg border rounded border-slate-900 text-white text-sm leading-6 font-medium"
          :class="`${(selectedHeader === 'NONE' || showAddVariableHeader) ? 'opacity-40 cursor-not-allowed' : ''}`" @click="addHeaderVariable"
          icon="heroicons-outline:plus" iconClass="mr-2" />
        <Fileinput classInput="mt-6 pl-2" placeholder="Select the media file for header"
          v-if="selectedHeader === 'IMAGE' || selectedHeader === 'VIDEO' || selectedHeader === 'DOCUMENT'"
          v-model="headerMedia" class="col-span-3" />

        <div class="flex col-span-4" v-if="showAddVariableHeader">
          <Button text="{{1}}" btnClass="bg-slate-100 text-slate-900 font-medium" disabled
            class="my-6 mr-3 inline-flex items-center justify-center h-10 w-10 leading-6 cursor-default" />
          <Textinput label="Sample Value for Header Variable" type="text" v-model="headerTextSample"
            placeholder="Enter Sample Value for Header Variable Here" classInput="w-full" class="flex-none w-[68%]" />
          <Button icon="heroicons-outline:trash" iconClass="text-lg text-white" @click="removeHeaderVariable"
            btnClass="bg-danger-500 text-slate-900 font-medium rounded"
            class="my-6 ml-3 flex-none relative inline-flex items-center justify-center h-10 w-10" />
        </div>
      </div>

      <div class="grid grid-cols-4 gap-5 lg:col-span-2">
        <Textarea label="Message" name="formatter-pn" placeholder="Write the message body here" class="col-span-3"
          v-model="message" :error="messageError" />
        <Button
          text="Add Variable"
          class="my-6 inline-flex items-center justify-center h-10 w-40 bg-slate-900 text-lg border rounded border-slate-900 text-white text-sm leading-6 font-medium"
          @click=""
          icon="heroicons-outline:plus" iconClass="mr-2" />

          <div class="flex col-span-4">
            <Button text="{{1}}" btnClass="bg-slate-100 text-slate-900 font-medium" disabled
              class="my-6 mr-3 inline-flex items-center justify-center h-10 w-10 leading-6 cursor-default" />
            <Textinput label="Sample Value for Header Variable" type="text"
              placeholder="Enter Sample Value for Header Variable Here" classInput="w-full" class="flex-none w-[68%]" />
            <Button icon="heroicons-outline:trash" iconClass="text-lg text-white" @click=""
              btnClass="bg-danger-500 text-slate-900 font-medium rounded"
              class="my-6 ml-3 flex-none relative inline-flex items-center justify-center h-10 w-10" />
          </div>
      </div>


      <Textinput label="Footer (optional)" name="footer" type="text" placeholder="Footer Text"
        description="Use Footers For Disclaimers And Thoughtful PS Messages." classInput="w-full" v-model="footer" />

      <div class="lg:col-span-2">
        <label class="input-label">Add Button (Optional)</label>
        <div v-for="(button, index) in buttons" :key="index">
          <div class="grid grid-cols-4 gap-4 mb-4">
            <Select :options="button_types" v-model="button.type" />
            <Textinput type="text" v-model="button.text" :name="`name[${index}]`" placeholder="Button Text"
              classInput="w-full" :disabled="button.type === 'NONE'" />
            <Textinput type="text" v-model="button.link" :name="`link[${index}]`"
              :placeholder="getButtonPlaceholder(button.type)" classInput="w-full" :disabled="button.type === 'NONE'" />

            <div class="flex items-end space-x-5">
              <button type="button" class="flex-none relative inline-flex items-center justify-center h-10 w-10
                    bg-danger-500 text-lg border rounded border-danger-500 text-white" @click="removeButton(index)"
                :class="`${(buttons.length == 1 && index == 0) ? 'opacity-40 cursor-not-allowed' : ''}`"
                :disabled="(buttons.length == 1 && index == 0)">
                <Icon icon="heroicons-outline:trash" />
              </button>

              <button type="button" class="flex-none relative inline-flex items-center justify-center h-10 w-40
                  bg-slate-900 text-lg border rounded border-slate-900 text-white text-sm leading-6 font-medium"
                @click="addNewButton()"
                :class="`${(buttons.length >= 3 || index >= 2 || button.type === 'NONE') ? 'opacity-40 cursor-not-allowed' : ''}`"
                :disabled="(buttons.length >= 3 || index >= 2 || button.type === 'NONE')">
                <Icon icon="heroicons-outline:plus" class="mr-2" />
                Add Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end mr-2">
      <Button text="Save Template"
        class="mr-3 inline-flex items-center justify-center h-10 w-40 bg-slate-900 text-lg border rounded border-slate-900 text-white text-sm leading-6 font-medium"
        @click="submitTemplate" />
      <Button v-if="showPreviewButton" text="Preview"
        class="inline-flex items-center justify-center h-10 w-40 bg-slate-900 text-lg border rounded border-slate-900 text-white text-sm leading-6 font-medium"
        @click="previewTemplate" icon="heroicons-outline:eye" iconClass="mr-2" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Select from "@/components/Select";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import Fileinput from "@/components/Fileinput";
import { addTemplateApi } from "@/api";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const props = defineProps({
  showPreviewButton: Boolean,
});
const emit = defineEmits();
const showPreviewButton = ref(props.showPreviewButton);

const selectedHeader = ref("NONE");
const showAddVariableHeader = ref(false);
const showAddVariableMessage = ref(false);

const header = [
  {
    value: "NONE",
    label: "No Header"
  },
  {
    value: "TEXT",
    label: "Text"
  },
  {
    value: "IMAGE",
    label: "Image"
  },
  {
    value: "VIDEO",
    label: "Video"
  },
  {
    value: "DOCUMENT",
    label: "Document"
  },
  {
    value: "LOCATION",
    label: "Location"
  },
];

const category = [
  {
    value: "UTILITY",
    label: "Utility"
  },
  {
    value: "MARKETING",
    label: "Marketing"
  }
];

const languages = [
  { value: "af", label: "Afrikaans" },
  { value: "vi", label: "Vietnamese" },
  { value: "zu", label: "Zulu" },
];

const button_types = [
  { value: 'NONE', label: 'No Button', placeholder: 'No Button Added' },
  { value: 'PHONE_NUMBER', label: 'Phone Number', placeholder: 'Enter Phone Number' },
  { value: 'URL', label: 'URL', placeholder: 'Enter Target URL' },
  { value: 'QUICK_REPLY', label: 'Quick Reply', placeholder: 'Add Quick Reply Message ' },
  { value: 'COPY_CODE', label: 'Copy', placeholder: 'Add Message To Copy' },
];

const getButtonPlaceholder = (buttonType) => {
  const selectedButton = button_types.find((button) => button.value === buttonType);
  return selectedButton ? selectedButton.placeholder : '';
};

const headerValue = computed(() => selectedHeader.value); // value of header from header array
// const buttonValue = computed(() => selectedButton.value); // value of button_types from button_types array
const footer = ref('');
const headerText = ref('');
const headerTextSample = ref('');
const headerMedia = ref('');


const buttons = ref([
  { type: 'NONE', text: '', link: '' } // Initial empty button
]);

const addNewButton = () => {
  buttons.value.push({ type: 'NONE', text: '', link: '' });
};

const removeButton = (index) => {
  buttons.value.splice(index, 1);
};

const addHeaderVariable = () => {
  console.log('showAddVariableHeader ', showAddVariableHeader.value);
  headerText.value += "{{1}}";
  showAddVariableHeader.value = true;
};

const removeHeaderVariable = () => {
  console.log('removeHeaderVariable headerText ', headerText.value);
  headerText.value = (headerText.value).replace("{{1}}", "");
  showAddVariableHeader.value = false;
};


const schema = yup.object({
  name: yup.string().required("Template name is required"),
  selectedCategory: yup.string().required("Category is required"),
  selectedLanguage: yup.string().required("Language is required"),
  message: yup.string().required("Message is required"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField("name");
const { value: selectedCategory, errorMessage: categoryError } = useField("selectedCategory");
const { value: selectedLanguage, errorMessage: languageError } = useField("selectedLanguage");
const { value: message, errorMessage: messageError } = useField("message");

const previewTemplate = () => {
  const header_type = ref('');
  if (headerValue.value != 'NONE') {
    header_type.value = headerValue.value
  }
  const formData = {
    // header: { img: headerMedia.value, text: headerText.value },
    // message: message.value,
    // footer: footer.value,
    // buttons: buttons.value,
    header_type: header_type.value,
    header_text: headerText.value,
    header_text_sample: headerTextSample.value,
    header_media: headerMedia.value,
    body: message.value,
    body_sample: [],
    footer: footer.value,
    buttons: { 'buttons': buttons.value },
  };
  console.log('preview Template', formData);
  emit('forminputchange', formData);
};

const submitTemplate = handleSubmit(
  async () => {
    const new_button = ref([]);
    buttons.value.forEach(button => {
      if (button.type === 'PHONE_NUMBER') {
        new_button.value.push({ type: button.type, text: button.text, phone_number: button.link });
      } else if (button.type === 'URL') {
        new_button.value.push({ type: button.type, text: button.text, url: button.link });
      } else {
        // new_button.value.push({ type: button.type, text: button.text });
        return;
      }
    });
    console.log(new_button.value);

    const header_type = ref('');
    if (headerValue.value != 'NONE') {
      header_type.value == headerValue.value
    }

    const formData = {
      name: name.value,
      category: selectedCategory.value,
      language: selectedLanguage.value,
      header_type: header_type.value,
      header_text: headerText.value,
      header_media: headerMedia.value,
      body: message.value,
      footer: footer.value,
      button: new_button.value,
    };
    console.log("Submit FormData :: ", formData)

    try {
      await addTemplateApi(formData);

    } catch (error) {
      // Handle API error
      console.error("Error adding template:", error);
    }
  });

</script>