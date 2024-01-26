<template>
  <div>
    <div class="font-semibold text-l mb-4">Account Settings</div>
    <div class="grid grid-cols-2 gap-4 mr-[30%]">
      <Textinput label="Full Name" name="fullname" type="text" classInput="w-full" v-model="fullname" />
      <Textinput label="Email" name="email" type="text" classInput="w-full" v-model="email" :disabled=true />
      <Textinput label="Phone" name="phone" type="text" classInput="w-full" v-model="phone" />
      <div class="grid grid-cols-2 gap-4">

        <Button text="Change Password" btnClass="btn bg-slate-600 border text-white font-normal my-6 h-12"
          @click="openChangePassword" />
        <Modal :activeModal="addmodal" @close="closeChangePassword" title="Edit Business Profile">
          <form @submit.prevent="changePassword">
            <div class="flex flex-col space-y-4">
              <Textinput label="Current Password" placeholder="Current Password" name="currentPassword" type="password"
                classInput="w-full" v-model="current_password" />
              <Textinput label="New Password" placeholder="New Password" name="newPassword" type="password"
                classInput="w-full" v-model="new_password" />
              <Textinput label="Re-type New Password" placeholder="Re-type New Password" name="retypePassword"
                type="password" classInput="w-full" v-model="re_new_password" />
            </div>
            <div slot="footer" class="text-right">
              <Button text="Change Password" type="submit"
                btnClass="h-12 inline-flex items-center justify-center mt-4 btn-dark" />
            </div>
          </form>
        </Modal>
        <Button text="Save changes" btnClass="btn bg-slate-600 border text-white font-normal my-6 h-12"
          :class="!isDataChanged ? 'opacity-40 cursor-not-allowed' : ''" :disabled="!isDataChanged"
          @click="saveChanges" />
      </div>
    </div>
  </div>
</template>

<script>
import Textinput from "@/components/Textinput";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { ref } from "vue";
import { putUserApi, changePasswordApi } from "@/api";

export default {
  components: {
    Textinput,
    Modal,
    Button,
  },
  data() {
    const userData = JSON.parse(localStorage.getItem('user')) || {};
    return {
      fullname: userData.fullname || "",
      email: userData.email || "",
      phone: userData.phone || "",
      current_password: "",
      new_password: "",
      re_new_password: "",
    }
  },
  computed: {
    isDataChanged() {
      const userData = JSON.parse(localStorage.getItem('user')) || {};
      return (
        this.fullname !== userData.fullname ||
        this.phone !== userData.phone
      );
    },
  },
  methods: {
    async saveChanges() {
      if (this.isDataChanged) {
        await putUserApi(this.fullname, this.phone, this.email);
        localStorage.setItem('user', JSON.stringify({ fullname: this.fullname, email: this.email, phone: this.phone }));
        alert('Changes saved successfully!');
      }
    },
    async changePassword() {
      if (this.new_password === this.re_new_password) {

        const response = await changePasswordApi(this.new_password, this.re_new_password, this.current_password);
        console.log("Password changed successfully", response);

        this.closeChangePassword();
      } else {
        console.error("New passwords do not match");
      }
    },
  },
  setup() {
    const addmodal = ref(false);

    const openChangePassword = () => {
      addmodal.value = true;
    };

    const closeChangePassword = () => {
      addmodal.value = false;
    };

    return {
      addmodal,
      openChangePassword,
      closeChangePassword,
    }
  },
}

</script>