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
    </div><template>
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
import { ref, onMounted } from 'vue';
import { useContactStore } from '@/store/contact';

export default {
  setup() {
    const contactStore = useContactStore();
    const selectedLastContacted = ref('7'); // Default value as a ref
    const contacts = ref([]);

    onMounted(async () => {
      await contactStore.fetchContact();
      contacts.value = contactStore.contacts;
    });

    const filteredContacts = () => {
      const currentDate = new Date();
      const selectedDays = parseInt(selectedLastContacted);
      const filtered = contacts.value.filter(contact => {
        const lastContactedDate = new Date(contact.lastmessageDate + ' ' + contact.lastmessageTime);
        const timeDifference = currentDate.getTime() - lastContactedDate.getTime();
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        return daysDifference <= selectedDays;
      });

      console.log(filtered);
      // Update your contacts value with the filtered array
      // You can assign it to contacts.value if needed
    };

    return {
      selectedLastContacted,
      filteredContacts,
    };
  },
};
</script>

<style scoped>
</style>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useContactStore } from '@/store/contact';

export default {
  setup() {
    const contactStore = useContactStore();
    const selectedLastContacted = ref('7'); // Default value as a ref
    const contacts = ref([]);

    onMounted(async () => {
      await contactStore.fetchContact();
      contacts.value = contactStore.contacts;
    });

    const filteredContacts = () => {
      

      const filtered = contacts.value.filter(contacts => {
        const current = new Date();
        const lastContactedDate = new Date();
        const lastDate = contacts.value.LastmessageTime-current

        switch(lastDate){
          case "7":
            return 
          case "15":
            return 


        }
       
      });

      console.log(filtered);
      console.log(contactStore.contacts);
    };

    return {
      selectedLastContacted,
      filteredContacts,
    };
  },
  async created() {
    const contactStore = useContactStore();
    await contactStore.fetchContact();
    this.contacts = contactStore.contacts;
    
  },
  methods: {  
   
  },
};
</script>

<style scoped>

</style>
