<template>
  <div>

    <div class="flex justify-between">
      <div class="flex justify-between font-semibold text-l">
        <div class="flex font-semibold text-l my-4">Whatsapp Numbers</div>
        <div class="flex">
          <Button text="Refresh Numbers" btnClass="bg-slate-600 text-white font-normal btn-sm my-3 ml-5 rounded-[999px]"
            icon="heroicons:arrow-path" iconClass="mr-2 font-semibold" @click="refreshNumbers" />
        </div>
      </div>

      <div class="md:flex md:space-x-4 md:justify-end my-3  items-start rtl:space-x-reverse">
        <Button icon="heroicons-outline:plus" text="Add Number" btnClass="btn-dark h-min btn-sm font-normal"
          iconClass="mr-2 text-lg" @click="addNumber" />
      </div>
    </div>


    <vue-good-table :columns="columns" styleClass=" vgt-table lesspadding2 table-head" :rows="this.numbers"
      :pagination-options="{
        enabled: true,
        perPage: perpage,
      }" max-height="45vh" :fixed-header="true" :sort-options="{
  enabled: false,
}">

      <template v-slot:table-row="props">
        <span v-if="props.column.field == 'no'" class="block w-4">
          {{ serialNumbers[props.index] }}
        </span>
        <span v-if="props.column.field == 'alias_name'">
          <span class="text-sm leading-4 items-center text-left">
            {{
              props.row.alias_name.length > 30
              ? props.row.alias_name.substring(0, 30) + "..."
              : props.row.alias_name
            }}
          </span>
        </span>

        <span v-if="props.column.field == 'status'" class="block w-8 text-xs">
          <span
            class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-slate-500 bg-slate-500"
            v-if="!props.row.status">Not Verified</span>
          <span
            class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 text-success-500 bg-success-500"
            v-if="props.row.status">Verified</span>
        </span>

        <span v-if="props.column.field == 'rating'" class="block w-8 text-xs">
          <span class="text-success-500 text-lg">
            <Icon icon="heroicons-solid:check-circle" v-if="props.row.quality_rating == 'GREEN'" />
          </span>
          <span class="text-warning-500 text-lg">
            <Icon icon="heroicons-solid:exclamation-circle" v-if="props.row.quality_rating == 'YELLOW'" />
          </span>
          <span class="text-danger-500 text-lg">
            <Icon icon="heroicons-solid:stop-circle" v-if="props.row.quality_rating == 'RED'" />
          </span>
        </span>
      </template>

      <template #pagination-bottom="props">
        <div class="py-3 px-3 justify-center flex bg-white">
          <Pagination :total="numbers.length" :current="current" :per-page="perpage" :pageRange="pageRange"
            @page-changed="current = $event" :pageChanged="props.pageChanged" :perPageChanged="props.perPageChanged" />
        </div>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { SimpleBar } from "simplebar-vue3";
import WAsettings from "./WAsettings";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useNumbersStore } from '@/store/number';
import { useRouter } from 'vue-router';

export default {
  components: {
    SimpleBar,
    WAsettings,
    Pagination,
    Button,
    Icon,
  },
  data() {
    return {
      current: 1,
      perpage: 5,
      pageRange: 10,
      columns: [
        {
          label: "No.",
          field: "no",
          width: "50px",
        },
        {
          label: "Number Alias",
          field: "alias_name",
          width: "200px",
        },
        {
          label: "Number",
          field: "number",
          width: "100px",
        },

        {
          label: "Status",
          field: "status",
          width: "100px",
        },
        {
          label: "Quality Rating",
          field: "rating",
          width: "100px",
        },

        {
          label: "Throughput",
          field: "throughput",
          width: "100px",
        },
      ],
      numbers: [],
    }
  },
  async created() {
    const numbersStore = useNumbersStore();

    // Update the numbers data in the table
    await numbersStore.getNumbers;
    this.numbers = numbersStore.numbers;
    // console.log("created number :: ", this.numbers);
  },
  methods: {
    async refreshNumbers() {
      const numbersStore = useNumbersStore();

      await numbersStore.fetchNumbers;
      this.numbers = numbersStore.numbers;
      // console.log("refreshNumbers number :: ", this.numbers);
    },
  },
  setup() {
    const router = useRouter();
    const addNumber = () => {
      router.push('/app/connect');
      console.log("router pushed");
    };
    return {
      addNumber,
    }
  },
  computed: {
    serialNumbers() {
      const numbers = this.numbers;

      return numbers.map((number, index) => index + 1);
    },
  },
}
</script>