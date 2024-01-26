<template>
  <div>
    <div v-if="isNew">
      <Textinput label="Contact List Name" placeholder="Enter name for the Contact List" classInput="w-1/2" />
        <div class="flex justify-end">
          <Button text="Create Contact List"  />
        </div>
    </div>
    <div v-if="!isNew">
      <VueSelect :options="contactlist" label="Select Contact List" placeholder="Select Contact List" classInput="w-1/2" />
        <div class="flex justify-end">
          <Button text="Add to Contact List" @click="updateOrganization"  />
        </div>
    </div>
  </div>
</template>

<script>
import Textinput from "@/components/Textinput";
import Button from "@/components/Button";
import VueSelect from "@/components/Select/VueSelect";
import { useContactListStore } from "@/store/ContactList";

export default {
  components: {
    Textinput,
    Button,
    VueSelect,
  },
  props: {
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      contactlist: [],
      contactlist_name: null
    }
  },
  methods: {
    async updateOrganization() {
      const contactListStore = useContactListStore();
      const listData = {
        name: this.contactlist_name,
        contacts: this.contactlist,
      };
      console.log('updateContactList listData :: ', listData);
      // await contactListStore.updateOrganization(listData);
    },
    async createOrganization() {
      const contactListStore = useContactListStore();
      await contactListStore.createContactList(this.contactlist_name);
    },
  },
  async created() {
    const contactListStore = useContactListStore();
    await contactListStore.getContactList;

    const listData = contactListStore.contactlists;
    console.log("contactlist :: ", listData);

    this.contactlist = listData.map(item => ({
      value: item.name,
      label: item.name,
    }));
    console.log("contactlist :: ", this.contactlist);
  }
}
</script>