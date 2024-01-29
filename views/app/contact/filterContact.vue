<template>
  <div>
    <div>
      <label for="lastContacted">Filter by Last Contacted:</label>
      <select v-model="selectedLastContacted" @change="filteredContacts" id="lastContacted">
        <option value="7">Last 7 Days</option>
        <option value="15">Last 15 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="90">Last 90 Days</option>
      </select>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import { useContactStore } from '@/store/contact';

export default {
  setup() {
    const contactStore = useContactStore();
    const state = reactive({
      selectedLastContacted: '7', // Default value
      contacts: [],
    });

    onMounted(async () => {
      await contactStore.fetchContact();
      state.contacts = contactStore.contacts;
    });

    const filteredContacts = () => {
      const currentDate = new Date();
      const selectedDays = parseInt(state.selectedLastContacted);
      const filtered = state.contacts.filter(contact => {
        const lastContactedDate = new Date(contact.lastmessageDate + ' ' + contact.lastmessageTime);
        const timeDifference = currentDate.getTime() - lastContactedDate.getTime();
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        return daysDifference <= selectedDays;
      });

      // Update your contacts value with the filtered array
      state.contacts = filtered;
    };

    return {
      ...state,
      filteredContacts,
    };
  },
};
</script>

<style scoped>
</style>
