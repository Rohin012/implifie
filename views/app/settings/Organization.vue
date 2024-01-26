<template>
  <div>
    <div
      class="profiel-wrap px-[30px] pb-2 rounded-lg bg-white flex space-y-0 justify-between items-end relative z-[1]">
      <div class="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 h-[60px] w-full z-[-1] rounded-t-lg">
      </div>
      <div class="profile-box text-start text-center">
        <div class="grid grid-cols-5 grid-rows-4 gap-x-6 gap-y-0 items-end space-x-6">
          <div class="row-span-4 self-center">
            <div class="h-[160px] w-[160px] ml-0 mr-0 mb-4 rounded-full ring-4 ring-slate-300 relative">
              <img src="https://cloud.implifie.com/assets/images/users/user-1.jpg" alt="" class="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <div class="col-span-4 self-start justify-self-end pr-4 pt-4">
            <Button text="Edit Business Profile" btnClass="btn-sm bg-slate-200 border" icon="heroicons:pencil"
              iconClass="text-sm mr-2" @click="openProfileEdit" />
            <Modal
              :activeModal="addmodal"
              @close="closeProfileEdit"
              title="Edit Business Profile">
                <BusinessProfile />
            </Modal>
          </div>
          <div class="col-span-4 self-end text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
            {{ organization.name }}
          </div>
          <div class="col-span-4 self-start text-sm font-light text-slate-600 dark:text-slate-400">
            {{ organization.description }}
          </div>
          <div>
            <div class="uppercase text-xs font-bold text-slate-600 mb-1 leading-[12px]">
              industry
            </div>
            <a class="text-sm text-slate-600 dark:text-slate-50">
              {{ organization.industry ? organization.industry : '-' }}
            </a>
          </div>
          <div>
            <div class="uppercase text-xs font-bold text-slate-600 mb-1 leading-[12px]">
              email
            </div>
            <a class="text-sm text-slate-600 dark:text-slate-50">
              {{ organization.email ? organization.email : '-' }}
            </a>
          </div>
          <div>
            <div class="uppercase text-xs font-bold text-slate-600 mb-1 leading-[12px]">
              website
            </div>
            <a class="text-sm text-slate-600 dark:text-slate-50">
              {{ organization.website ? organization.website : '-' }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import BusinessProfile from "./BusinessProfile.vue";
import Icon from "@/components/Icon";
import { ref, onMounted } from "vue";
import { useOrganizationStore } from '@/store/organization';

export default {
  components: {
    Icon,
    Button,
    Modal,
    BusinessProfile,
  },
  setup() {
    const organizationStore = useOrganizationStore();
    const organization = ref({});

    onMounted(async () => {
      if (organizationStore.organization.length === 0) {
        await organizationStore.fetchOrganization();
      }
      // Update the organization data
      organization.value = organizationStore.organization;
    });    

    const addmodal = ref(false);

    const openProfileEdit = () => {
      addmodal.value = true;
    };

    const closeProfileEdit = () => {
      addmodal.value = false;
      organization.value = organizationStore.organization;
    };

    return {
      addmodal,
      organization,
      openProfileEdit,
      closeProfileEdit,      
    }
  },
}
</script>