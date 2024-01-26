<template>
  <div>
    <div class="font-semibold text-l mb-4">Whatsapp Settings</div>
    <div class="grid grid-cols-4 gap-4 max-w-[70rem]">
      <div class="col-span-2">
        <Textinput label="Whatsapp Business Account ID" name="waba" type="text" classInput="w-full"
          description="Enter the Whatsapp Business Account ID" placeholder="Enter the Whatsapp Business Account ID"
          v-model="waba" />
      </div>

      <div class="col-span-2">
        <Textinput label="Whatsapp Business Permanent Token" name="token" type="text" classInput="w-full"
          description="Enter the Whatsapp Business Permanent Token"
          placeholder="Enter the Whatsapp Business Permanent Token" v-model="token" />
      </div>

      <div class="col-span-3">
        <InputGroup type="text" label="Webhook URL" placeholder="Webhook URL" name="webhook_url" classInput="w-full"
          description="Enter this Webhook URL to receive updates from your Meta App" isReadonly v-model="webhook_url">
          <template v-slot:append>
            <Button text="Copy" icon="heroicons-outline:document-duplicate" iconClass="mr-1 text-xl"
              btnClass="btn-outline-dark" @click="copyText(webhook_url)" />
          </template>
        </InputGroup>
      </div>


      <div class="col-span-1">
        <InputGroup type="text" label="Webhook Verify Token" placeholder="Webhook Pin" name="webhook_pin"
          classInput="w-full" description="Enter this token in your Meta App to verify the webhook subscription" isReadonly
          v-model="webhook_pin">
          <template v-slot:append>
            <Button text="Copy" icon="heroicons-outline:document-duplicate" iconClass="mr-1 text-xl"
              btnClass="btn-outline-dark" @click="copyText(webhook_pin)" />
          </template>
        </InputGroup>
      </div>

      <div class="flex col-span-4 justify-end">
        <Button text="Save changes" btnClass="btn bg-slate-600 border text-white font-normal my-6 h-12"
          :class="!isDataChanged ? 'opacity-40 cursor-not-allowed' : ''" :disabled="!isDataChanged"
          @click="saveChanges" />
      </div>



    </div>


  </div>
</template>

<script>
import { SimpleBar } from "simplebar-vue3";
import Textinput from "@/components/Textinput";
import InputGroup from "@/components/InputGroup";
import Button from "@/components/Button";
import { useOrganizationStore } from "@/store/organization";
import { useToast } from "vue-toastification";


export default {
  components: {
    SimpleBar,
    Textinput,
    Button,
    InputGroup,
  },
  data() {
    return {
      waba: "",
      token: "",
      org_waba: "",
      org_token: "",
      webhook_url: "",
      webhook_pin: "",
    };
  },
  computed: {
    isDataChanged() {
      console.log("isDataChanged this.waba :: ", this.waba);
      return (this.waba !== this.org_waba || this.token !== this.org_token);
    },
  },
  methods: {
    async saveChanges() {
      if (this.isDataChanged) {
        const organizationStore = useOrganizationStore();
        const organizationData = organizationStore.organization;

        organizationData.waba_id = this.waba;
        organizationData.permanent_token = this.token;
        console.log("saveChanges organizationData.waba :: ", organizationData.waba_id);
        await organizationStore.updateOrganization(organizationData);

        const toast = useToast();
        toast.success("Changes saved successfully!", {
          timeout: 2000,
        });
      }
    },
    copyText(inputGroup) {
      // console.log(`copyText inputGroupRef :: ${inputGroup}`);
      if (inputGroup) {
        const textarea = document.createElement('textarea');
        textarea.value = inputGroup;
        // console.log(`copyText textarea.value :: ${textarea.value}`);
        document.body.appendChild(textarea);
        // console.log(`copyText textarea.value :: ${textarea.value}`);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        const toast = useToast();
        toast.success(`Copied to clipboard!`, {
          timeout: 2000,
        });
      } else {
        console.error('Input element not found.');
      }
    },
  },
  async created() {
    const organizationStore = useOrganizationStore();
    await organizationStore.getOrganization;

    const organizationData = organizationStore.organization;
    console.log("created organizationData :: ", organizationData);

    // Set the waba and token data
    if (organizationData) {
      this.waba = organizationData.waba_id;
      this.token = organizationData.permanent_token;
      this.org_waba = organizationData.waba_id;
      this.org_token = organizationData.permanent_token;
      this.webhook_url = "https://api.implifie.com/api/webhooks/" + organizationData.webhook;
      this.webhook_pin = organizationData.webhook_code;
    }
  },

}
</script>