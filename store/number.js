// number.js
import { defineStore } from 'pinia';
import { getNumbersApi } from '@/api';

export const useNumbersStore = defineStore('numbers', {
  state: () => ({
    numbers: [],
  }),
  getters: {
    getNumbers: async function (state) {
      // Check if numbers is an empty array
      // console.log("getNumbers 1", state.numbers);
      if (state.numbers.length === 0) {
        // console.log("Numbers Len 0");
        // Fetch numbers data from API
        await this.fetchNumbers();
      }
      // console.log("getNumbers 2", state.numbers);
      return state.numbers;
    },
  },
  actions: {
    setNumbers(data) {
      // console.log("setNumbers data :: ", data);
      this.numbers = data;
    },
    async fetchNumbers() {
      // Call the API to get numbers data
      // console.log("fetchNumbers called");
      const response = await getNumbersApi();
      // console.log("fetchNumbers respone :: ", response);
      
      // Update the numbers in the store
      this.setNumbers(response);

      return response;
    },
  },
});
