<template>
  <div class="loginwrapper">
    <div class="lg-inner-column">
      <LeftCol />
      <div class="right-column relative">
        <div class="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
          <div class="auth-box h-full flex flex-col justify-center">
            <div class="mobile-logo text-center mb-6 lg:hidden block">
              <router-link to="/">
                <img src="https://cloud.implifie.com/assets/images/logo/logo.svg" alt="" class="mx-auto" />
              </router-link>
            </div>
            <div class="text-center 2xl:mb-10 mb-4">
              <h4 class="font-medium">Sign in</h4>
              <div class="text-slate-500 text-base">
                Sign in to your account to start using Dashcode
              </div>
            </div>
            <form @submit.prevent="onSubmit" class="space-y-4">
              <Textinput label="Email" type="email" placeholder="Your Email Address" name="email" v-model="email"
                :error="emailError" classInput="h-[48px] w-full" />
              <Textinput label="Password" type="password" placeholder="Your account password" name="password"
                v-model="password" :error="passwordError" hasicon classInput="h-[48px] w-full" />

              <div class="flex justify-between">
                <label class="cursor-pointer flex items-start">
                  <input type="checkbox" class="hidden" @change="() => (checkbox = !checkbox)" />
                  <span
                    class="h-4 w-4 border rounded flex-none inline-flex mr-3 relative top-1 transition-all duration-150"
                    :class="checkbox
                      ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
                      : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
                      ">
                    <img src="https://cloud.implifie.com/assets/images/icon/ck-white.svg" alt=""
                      class="h-[10px] w-[10px] block m-auto" v-if="checkbox" />
                  </span>
                  <span class="text-slate-500 dark:text-slate-400 text-sm leading-6">Keep me signed in</span>
                </label>
                <router-link to="/forgot-password"
                  class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium">Forgot Password?</router-link>
              </div>

              <button type="submit" class="btn btn-dark block w-full text-center">
                Sign in
              </button>
            </form>

            <div class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm">
              Don’t have an account? Sign up
              <router-link to="/register" class="text-slate-900 dark:text-white font-medium hover:underline">
                Sign up
              </router-link>
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

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { loginApi } from "@/api";

export default {
  data() {
    return {
      checkbox: false,
    }
  },
  components: {
    Textinput,
    LeftCol,

  },
  setup() {
    const schema = yup.object({
      email: yup.string().required("Email is required").email(),
      password: yup.string().required("Password is required").min(8),
    });

    const toast = useToast();
    const router = useRouter();

    const { handleSubmit } = useForm({
      validationSchema: schema,
    });

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: password, errorMessage: passwordError } = useField("password");

    const onSubmit = handleSubmit(async (values) => {
      try {
        const { email, password } = values;

        await loginApi(email, password);

        router.push('/app/inbox');

        toast.success("Login successful", {
          timeout: 2000,
        });
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please try again later.", {
          timeout: 2000,
        });
      }
    });

    return {
      email,
      emailError,
      password,
      passwordError,
      onSubmit,
    };
  },
};
</script>
