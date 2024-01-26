<template>
  <div>
    <div class="flex flex-wrap justify-between items-center">
      <Card className="py-4 w-full ">
        <div class="grid grid-cols-4 gap-5">
          <div></div>

          <div class="flex col-span-2 z-[5] items-center relative justify-center md:mx-8">
            <div class="relative z-[1] items-center item flex flex-start flex-1 last:flex-none group"
              v-for="(item, i) in steps" :key="i">
              <div :class="`   ${stepNumber >= i
                ? 'bg-slate-900 text-white ring-slate-900 ring-offset-2 dark:ring-offset-slate-500 dark:bg-slate-900 dark:ring-slate-900'
                : 'bg-white ring-slate-900 ring-opacity-70  text-slate-900 dark:text-slate-300 dark:bg-slate-600 dark:ring-slate-600 text-opacity-70'
                }`"
                class="transition duration-150 icon-box h-8 w-8 rounded-full flex flex-col items-center justify-center relative z-[66] ring-2 md:text-lg text-base font-medium">
                <span v-if="stepNumber <= i"> {{ i + 1 }}</span>
                <span v-else class="text-3xl">
                  <Icon icon="bx:check-double" />
                </span>
              </div>

              <div class="absolute top-1/2 h-[2px] w-full" :class="stepNumber >= i
                ? 'bg-slate-900 dark:bg-slate-900'
                : 'bg-[#E0EAFF] dark:bg-slate-700'
                "></div>
              <div
                class="absolute top-full text-base md:leading-6 mt-3 transition duration-150 md:opacity-100 opacity-0 group-hover:opacity-100"
                :class="stepNumber >= i
                  ? ' text-slate-900 dark:text-slate-300'
                  : 'text-slate-500 dark:text-slate-300 dark:text-opacity-40'
                  ">
                <span class="w-max">{{ item.title }}</span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <SimpleBar class="h-[65vh]">
          <div class="conten-box mt-4 ml-8 pt-6">
            <form>
              <div v-if="stepNumber === 0">
                <div class="grid grid-cols-2 gap-5">
                  <div class="col-span-2">
                    <h4 class="text-base text-slate-800 dark:text-slate-300 text-lg">
                      Broadcast Details
                    </h4>
                  </div>
                  <Textinput label="Broadcast Name" classInput="w-3/4" type="text" placeholder="Broadcast Name"
                    name="fullname" description="Enter a name for this broadcast" />

                  <VueSelect :options="numbers" label="Select Whatsapp Number" classLabel="w-3/4"
                    :placeholder="`Select Whatsapp Number`"
                    description="The selected Whatsapp number will be used to send out the broadcast messages" />

                  <VueSelect :options="hours" label="Working Hours" classLabel="w-3/4"
                    :placeholder="`Select Working Hours`"
                    description="The selected time slot will be used to send out the broadcast messages" />
                </div>
                <div class=" mt-6 grid grid-cols-1 gap-5">
                  <h4 class="text-base text-slate-800 dark:text-slate-300 text-lg">
                    Select Your Target Audience
                  </h4>
                  <div class="flex">
                    <div class="flex-0 w-1/4">
                      <VueSelect :options="contacts" label="Contact List" :placeholder="`Select Contact List`"
                        description="The contacts from the selected List will contacted by this broadcast" />
                    </div>
                    <div
                      class="mx-10 my-10 bg-slate-300 text-black ring-slate-300 h-7 w-7 rounded-full flex flex-col items-center justify-center relative z-[66] ring-2 text-md text-base font-medium">
                      <span>OR</span>
                    </div>
                    <div class="flex-0 w-1/4">
                      <label class="inline-block input-label" for="upload">Upload your contact list</label>
                      <Fileinput filenametag />
                    </div>
                  </div>
                </div>
                <div class=" mt-6 grid grid-cols-1 gap-5">
                  <h4 class="text-base text-slate-800 dark:text-slate-300 text-lg">
                    Select Your Broadcast Message
                  </h4>
                  <div class="flex">
                    <div class="flex-0 w-1/4">
                      <VueSelect :options="templates" label="Templates" :placeholder="`Select Templates`"
                        description="The selected template will be sent to your contacts" />
                    </div>
                    <div
                      class="mx-10 my-10 bg-slate-300 text-black ring-slate-300 h-7 w-7 rounded-full flex flex-col items-center justify-center relative z-[66] ring-2 text-md text-base font-medium">
                      <span>OR</span>
                    </div>
                    <div class="flex-0 w-1/4 my-7">
                      <Modal title="Create New Template" label="Create New Template" labelClass="btn-md btn-dark"
                        :isOpen="isModalOpen" @close="closeModal" sizeClass="max-w-5xl">
                        <SimpleBar>
                          <TemplateForm />
                        </SimpleBar>
                      </Modal>
                    </div>

                  </div>
                </div>
              </div>
              <div v-if="stepNumber === 1">
                <div class="grid md:grid-cols-2 grid-cols-1 gap-5">
                  <div class="md:col-span-2 col-span-1">
                    <h4 class="text-base text-slate-800 dark:text-slate-300 mb-6">
                      Enter Your Personal info-500
                    </h4>
                  </div>
                  <Textinput label="First name" type="text" placeholder="First name" name="firstname" v-model="fname"
                    :error="fnameError" />
                  <Textinput label="Last name" type="text" placeholder="Last name" name="lasttname" v-model="lname"
                    :error="lnameError" />
                </div>
              </div>

              <div class="mt-10 mr-8" :class="stepNumber > 0 ? 'flex justify-between' : ' text-right'">
                <Button @click.prevent="prev()" text="edit broadcast" btnClass="btn-dark" v-if="this.stepNumber !== 0" />
                <Button :text="stepNumber !== this.steps.length - 1 ? 'preview broadcast' : 'submit'"
                  btnClass="btn-dark" />
              </div>
            </form>

          </div>
        </SimpleBar>
      </Card>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumbs";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Modal from '@/components/Modal/Modal';
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import VueSelect from "@/components/Select/VueSelect";
import Fileinput from "@/components/Fileinput";
import TemplateForm from "@/views/app/template/TemplateForm.vue";
import { useField, useForm } from "vee-validate";
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { SimpleBar } from "simplebar-vue3";
import { useNumbersStore } from '@/store/number';
import * as yup from "yup";
export default {
  components: {
    Button,
    Modal,
    Icon,
    Textinput,
    InputGroup,
    Textarea,
    Card,
    Breadcrumb,
    VueSelect,
    Fileinput,
    TemplateForm,
    SimpleBar,
  },
  data() {
    return {
      numbers: [],
    }
  },
  setup() {
    let steps = [
      {
        id: 1,
        title: "Broadcast Details",
      },
      {
        id: 2,
        title: "Preview",
      },
    ];

    const toast = useToast();
    let stepNumber = ref(0);

    let detailSchema = yup.object().shape({});

    let previewSchema = yup.object().shape({});

    let currentSchema = computed(() => {
      switch (stepNumber.value) {
        case 0:
          return detailSchema;
        case 2:
          return previewSchema;
        default:
          return detailSchema;
      }
    });

    const { handleSubmit } = useForm({
      validationSchema: currentSchema,
      keepValuesOnUnmount: true,
    });

    const submit = handleSubmit(() => {
      // next step until last step . if last step then submit form
      let totalSteps = steps.length;
      const isLastStep = stepNumber.value === totalSteps - 1;
      if (isLastStep) {
        stepNumber = totalSteps - 1;

        toast.success -
          500("Form Submited", {
            timeout: 2000,
          });
      } else {
        stepNumber.value++;
      }
    });

    const prev = () => {
      stepNumber.value--;
    };

    const isModalOpen = ref(false);

    const openModal = () => {
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    return {
      submit,
      steps,
      stepNumber,
      prev,
      hours: [
        {
          value: "Orange",
          label: "Orange",
        },
        {
          value: "Apple",
          label: "Apple",
        },
        {
          value: "Banana",
          label: "Banana",
        },
      ],
      contacts: [
        {
          value: "Orange",
          label: "Orange",
        },
        {
          value: "Apple",
          label: "Apple",
        },
        {
          value: "Banana",
          label: "Banana",
        },
      ],
      templates: [
        {
          value: "Orange",
          label: "Orange",
        },
        {
          value: "Apple",
          label: "Apple",
        },
        {
          value: "Banana",
          label: "Banana",
        },
      ],
      isModalOpen,
      openModal,
      closeModal,
    };
  },
  async created() {
    const numbersStore = useNumbersStore();

    // Update the numbers data in the table
    await numbersStore.getNumbers;
    const numbersData = numbersStore.numbers;
    console.log("numbersData", numbersData);

    this.numbers = numbersData.map(item => ({
      id: item.id,
      value: item.alias_name,
      label: `${item.number} - [ ${item.alias_name} ]`,
    }));
    console.log("numbers :: ", this.numbers);
  },
};
</script>
<style lang="scss" scoped></style>