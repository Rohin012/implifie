<template>
  <div class="loginwrapper">
    <div class="lg-inner-column">
      <LeftCol />
      <div class="right-column relative bg-white dark:bg-slate-800">
        <div class="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
          <div class="auth-box h-full flex flex-col justify-center">
            <div class="mobile-logo text-center mb-6 lg:hidden block">
              <router-link to="/"><img src="https://cloud.implifie.com/assets/images/logo/logo.svg" alt="" class="mx-auto" /></router-link>
            </div>
            <div class="text-center 2xl:mb-10 mb-5">
              <h4 class="font-medium">Sign up</h4>
              <div class="text-slate-500 dark:text-slate-400 text-base">
                Create an account to start using Dashcode
              </div>
            </div>
            <form @submit.prevent="onSubmit" class="space-y-4">
              <Textinput label="Full name" type="text" placeholder="Full Name" name="fullname" v-model="name"
                :error="nameError" classInput="h-[42px] w-full" />
              <Textinput label="Email" type="email" placeholder="Type your email" name="email" v-model="email"
                :error="emailError" classInput="h-[42px] w-full" />
              <Textinput label="Phone" type="text" placeholder="Phone number" name="phone" v-model="phone" :error="phoneError" classInput="h-[42px] w-full" />              
              <Textinput label="Password" type="password" placeholder="8+ characters, 1 capital letter" name="password"
                v-model="password" :error="passwordError" hasicon classInput="h-[42px] w-full" />


              <label class="cursor-pointer flex items-start">
                <input type="checkbox" class="hidden" @change="() => (checkbox = !checkbox)" />
                <span class="h-4 w-4 border rounded inline-flex mr-3 relative flex-none top-1 transition-all duration-150"
                  :class="checkbox
                    ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
                    : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
                    ">
                  <img src="https://cloud.implifie.com/assets/images/icon/ck-white.svg" alt="" class="h-[10px] w-[10px] block m-auto"
                    v-if="checkbox" />
                </span>
                <span class="text-slate-500 dark:text-slate-400 text-sm leading-6">You accept our <b><a href="https://www.implifie.com/terms-of-use/" target="_blank">Terms of Use</a></b> and
                  <b><a href="https://www.implifie.com/privacy-policy/" target="_blank">Privacy Policy</a></b></span>
                </label>
                <div v-if="checkboxError" class="text-red-500 dark:text-red-400 text-sm">{{ checkboxError }}</div>

              <button type="submit" :disabled="!checkbox" class="btn btn-dark block w-full text-center" :class="`${ !checkbox ? 'opacity-40 cursor-not-allowed' : ''}`">
                Create an account
              </button>
            </form>

            <div
              class="max-w-[215px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm">
              Already registered?
              <router-link to="/" class="text-slate-900 dark:text-white font-medium hover:underline">
                Sign In</router-link>
            </div>
          </div>
          <div class="auth-footer text-center">
            Copyright 2023, Implifie Technologies All Rights Reserved.
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

import { inject } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import { registerApi } from "@/api";

export default {
  components: {
    Textinput,
    LeftCol,
  },
  data() {
    return {
      checkbox: false
    };
  },
  setup() {
    const schema = yup.object({
      email: yup.string().required(" Email is required").email(),
      password: yup.string().required("Password is  required").min(8),
      name: yup.string().required("Full name is required").min(3).max(50),
      phone: yup.string().min(11).max(13),
      checkbox: yup.boolean().oneOf([true], "You must accept the Terms of Use"),
    });
    const swal = inject("$swal");
    const toast = useToast();
    const router = useRouter();

    const users = [];
    const { handleSubmit } = useForm({
      validationSchema: schema,
    });

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: name, errorMessage: nameError } = useField("name");
    const { value: password, errorMessage: passwordError } =
      useField("password");
    const { value: phone, errorMessage: phoneError } = useField("phone");
    const { value: checkbox, errorMessage: checkboxError } = useField("checkbox");

    const onSubmit = handleSubmit(async (values) => {
      try {
        const { name, email, phone, password } = values;

        const registrationResponse = await registerApi(name, email, phone, password);

        console.log("Registration successful:", registrationResponse);

        router.push('/');

      } catch (error) {
        console.error("Registration error:", error);
        swal.fire({
          title: "Registration Failed",
          text: "Please try again later",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    });

    return {
      email,
      name,
      nameError,
      emailError,
      phone,
      phoneError,
      password,
      passwordError,
      checkbox,
      checkboxError,
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
