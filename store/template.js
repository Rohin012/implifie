// @/store/templates.js
import { defineStore } from 'pinia';
import { getTemplatesApi } from "@/api";

export const useTemplatesStore = defineStore({
  id: 'templates',
  state: () => ({
    template: [],
  }),
  getters: {
    // getTemplate: (state) => state.template,
    getTemplate: async function (state) {
      if (state.template.length === 0) {
        // console.log("Template Len 0");
        // Fetch template data from API
        await this.fetchTemplate();
      }
      console.log("getTemplate :: ", state.template);
      return state.template;
    },
  },
  actions: {
    setTemplate(data) {
      // this.template = data.map(template => {
      //   const buttons = Array.isArray(template.button) ? template.button.map(btn => ({
      //     link: btn.link,
      //     text: btn.text,
      //     type: btn.type,
      //   })) : [];

      //   const templateData = {
      //     id: template.id,
      //     name: template.name,
      //     category: template.category,
      //     language: template.language,
      //     header_type: template.header_type,
      //     header_text: template.header_text,
      //     header_text_sample: template.header_text_sample,
      //     header_media: template.header_media,
      //     header_media_sample: template.header_media_sample,
      //     body: template.body,
      //     body_sample: template.body_sample,
      //     footer: template.footer,
      //     button: buttons,
      //     user: template.user,
      //   };
                
        // return templateData;
      // });
      this.template = data;
    },
    
    async fetchTemplate() {
      const response = await getTemplatesApi();
      console.log("fetchTemplate respone :: ", response);

      // Update the Contact in the store
      this.setTemplate(response);
      console.log("fetchTemplate after api request", this.template);
      return response.data;
    },
  },
  
});
