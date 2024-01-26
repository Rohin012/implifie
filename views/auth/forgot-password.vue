<template>
  <div class="loginwrapper">
    <div class="lg-inner-column">
      <LeftCol />
      <div class="right-column relative">
        <div
          class="inner-content h-full flex flex-col bg-white dark:bg-slate-800"
        >
          <div class="auth-box2 flex flex-col justify-center h-full">
            <div class="mobile-logo text-center mb-6 lg:hidden block">
              <router-link to="/"
                ><img
                  src="https://cloud.implifie.com/assets/images/logo/logo.svg"
                  alt=""
                  class="mx-auto"
              /></router-link>
            </div>
            <div class="text-center 2xl:mb-10 mb-5">
              <h4 class="font-medium mb-4">Forgot Your Password?</h4>
              <div class="text-slate-500 dark:text-slate-400 text-base">
                Reset Password with Dashcode.
              </div>
            </div>
            <div
              class="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4 mt-10"
            >
              Enter your Email and instructions will be sent to you!
            </div>

            <form @submit.prevent="onSubmit" class="space-y-4">
              <Textinput label="Email" type="email" placeholder="Your Email Address" name="email" v-model="email"
                :error="emailError" classInput="h-[48px] w-full" />

    <button type="submit" class="btn btn-dark block w-full text-center">
      Send recovery email
    </button>
  </form>
            <div
              class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm"
            >
              Forget It,
              <router-link
                to="/"
                class="text-slate-900 dark:text-white font-medium hover:underline"
              >
                Send me Back
              </router-link>
              to The Sign In
            </div>
          </div>
          <div class="auth-footer text-center">
            Copyright 2021, Dashcode All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Textinput from "@/components/Textinput";
import LeftCol from "./left_col.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

import { forgetPasswordApi } from "@/api";
// import { useToast } from "vue-toastification";

export default {
  components: {
    Textinput,
    LeftCol,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  setup() {
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required("Email is required").email(),
    });

    // const toast = useToast();

    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields

    const { value: email, errorMessage: emailError } = useField("email");

    const onSubmit = handleSubmit(async () => {
      try {
        await forgetPasswordApi(email.value);
        // toast.success("Password reset instructions sent to your email.");
      } catch (error) {
        // toast.error("Failed to send password reset instructions.");
        console.error("Error:", error);
      }
    });

    return {
      email,
      emailError,
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
