<template>
  <div>
    <Button @click="launchWhatsAppSignup" :btnClass="`btn-primary ${btnClass}`"
      :class="`${isDisabled ? ' opacity-40 cursor-not-allowed' : ''}`" :disabled="isDisabled">
      <span class="flex">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
          <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
          <path fill="#fff"
            d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z">
          </path>
        </svg>
        <span class="ml-3 my-1">
          Connect using Facebook
        </span>
      </span>
    </Button>


  </div>
</template>


<script>
import { ref } from "vue";
import Button from "@/components/Button";
import { useOrganizationStore } from "@/store/organization";

export default {
  components: {
    Button,
  },
  data() {
    return {
      code: null,
      waba_id: null,
    }
  },
  mounted() {
    this.initializeFacebookSDK();
    this.setupSessionInfoListener();
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    btnClass: {
      type: String,
      default: 'w-96',
    },
  },
  methods: {
    async updateOrganization(code, waba_id) {
      console.log('updateOrganization Meta Login Code :: ', code);
      console.log('updateOrganization waba_id :: ', waba_id);
      const organizationStore = useOrganizationStore();
      await organizationStore.getOrganization;
      const organizationData = organizationStore.organization;

      organizationData.meta_login_code = code;
      organizationData.waba_id = waba_id;
      await organizationStore.updateOrganization(organizationData);

      console.log('organizationData after update:', organizationData);
    },
    initializeFacebookSDK() {
      // Check if the Facebook SDK has already been initialized
      if (typeof FB !== "undefined") {
        return;
      }

      // Initialize Facebook SDK
      window.fbAsyncInit = function () {
        FB.init({
          appId: '367044752330828',
          cookie: true,
          xfbml: true,
          version: 'v18.0',
        });

        FB.AppEvents.logPageView();
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    },
    setupSessionInfoListener() {
      const sessionInfoListener = (event) => {
        if (event.origin !== "https://www.facebook.com") return;
        try {
          const data = JSON.parse(event.data);
          console.log("setupSessionInfoListener Data :: ", data);
          if (data.type === 'WA_EMBEDDED_SIGNUP') {
            if (data.event === 'FINISH') {
              this.waba_id = data.data.waba_id;
              console.log('setupSessionInfoListener WABA ::', this.waba_id);
            } 
          }
        } catch {
          console.log('Non JSON Response', event.data);
        }
      };

      window.addEventListener('message', sessionInfoListener);
    },
    launchWhatsAppSignup() {
      console.log("typeof FB :: ", FB);
      if (typeof FB !== "undefined") {
        FB.login((response) => {

          if (response.authResponse) {
            this.code = response.authResponse.code;
            console.log('launchWhatsAppSignup Meta Login Code :: ', this.code);
            console.log('launchWhatsAppSignup Meta WABA :: ', this.waba_id);
            console.log('Facebook SDK response:', response.authResponse);
            
            this.updateOrganization(this.code, this.waba_id);
          } else {
            console.log('User canceled login or did not fully authorize.');
          }

        }, {
          config_id: '2306731412857667',
          response_type: 'code',
          override_default_response_type: true,
          extras: {
            sessionInfoVersion: 2,
          },
        })
      } else {
        console.error("Facebook SDK not initialized");
        this.initializeFacebookSDK();
        this.setupSessionInfoListener();
        console.log("initializeFacebookSDK again");
      }
    },

  },
};
</script>