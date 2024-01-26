<template>
  <div>
    <div class="flex justify-between">
      <div class="flex justify-between">
        <!-- <Button icon="heroicons-outline:chevron-left" btnClass="btn-sm" iconClass="font-bold text-xl"
          @click="cancel" v-if="$route.name === 'create-broadcast'" /> -->
        <Breadcrumb />
      </div>

      <div class="md:flex md:space-x-4 md:justify-end items-start rtl:space-x-reverse">
        <Button icon="heroicons-outline:plus" text="New Broadcast" btnClass="btn-dark h-min btn-md text-sm font-normal"
          iconClass="mr-2 text-lg" @click="create" v-if="$route.name === 'broadcast'" />
        <Button icon="heroicons-outline:plus" text="New Broadcast 1" btnClass="btn-dark h-min btn-md text-sm font-normal"
          iconClass="mr-2 text-lg" @click="create1" v-if="$route.name === 'broadcast'" />
        <Button icon="heroicons-outline:x-mark" text="Cancel" btnClass="btn-outline-dark h-min btn-md text-sm font-normal"
          iconClass="mr-2 text-lg" @click="cancel" v-if="$route.name === 'create-broadcast1'" />
      </div>
    </div>

    <!-- <div>
      <Card bodyClass="p-3 mb-3" v-if="screen === 'list'">
        <GridSkeltion :count="2" v-if="isSkeletion1" />
        <Statistics v-if="!isSkeletion1" />
      </Card>
    </div>

    <div v-if="screen === 'list'">
      <SimpleBar class="h-[57vh]">
        <TableSkeltion :count="5" v-if="isSkeletion" />
        <Broadcast v-if="!isSkeletion" />
      </SimpleBar>
    </div> -->

    <div v-if="$route.name === 'broadcast'">
      <Broadcast />
    </div>

    <div v-if="$route.name === 'create-broadcast1'">
      <AddBroadcast1 />
    </div>
    <div v-if="$route.name === 'create-broadcast'">
      <AddBroadcast />
    </div>
  </div>
</template>
<script setup>
import { SimpleBar } from "simplebar-vue3";
import Breadcrumb from "@/components/Breadcrumbs";
import Card from "@/components/Card";
import Button from "@/components/Button";
import TableSkeltion from "@/components/Skeleton/Table";
import GridSkeltion from "@/components/Skeleton/Project-grid";
import { computed, ref, watch, onMounted } from "vue";
import Broadcast from "./BroadcastList.vue";
import AddBroadcast1 from "./AddBroadcast1.vue";
import AddBroadcast from "./AddBroadcast.vue";
import { useProjectStore } from "@/store/project";
import { useRouter } from 'vue-router';

let screen = ref("list");

const store = useProjectStore();
const openProject = () => {
  store.openProject();
};

const width = ref(0);
const handleResize = () => {
  width.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

const router = useRouter();
const create = () => {
  router.push('/app/broadcast/create');
};
const create1 = () => {
  router.push('/app/broadcast/create1');
};
const cancel = () => {
  router.push('/app/broadcast');
};

const projects = computed(() => store.projects);

const isSkeletion = ref(true);
setTimeout(() => {
  isSkeletion.value = false;
}, 1000);
const isSkeletion1 = ref(true);
setTimeout(() => {
  isSkeletion1.value = false;
}, 1000);
</script>