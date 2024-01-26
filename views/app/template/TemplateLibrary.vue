<template>
    <div>
      <!-- Your Kanban view code here -->
      <div class="flex space-x-6 overflow-hidden overflow-x-auto">
        <div
          v-for="category in categories"
          :key="category"
          class="w-[250px] flex-none bg-slate-200 dark:bg-slate-700 rounded"
        >
          <div class="relative flex justify-between items-center bg-white rounded shadow-base px-6 py-2">
            <div class="text-slate-900 dark:text-white font-medium capitalize">
              {{ category }}
            </div>
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <!-- Add the count of templates here -->
              {{ templatesCountByCategory(category) }}
            </div>
          </div>
          <!-- Display template previews for this category -->
          <SimpleBar class="h-[65vh]">
          <div 
            v-for="template in getTemplatesByCategory(category)" 
            :key="template.id"
            >
            <!-- Map the template data to the 'preview' structure -->
            <Preview
                :header="mapTemplateToPreview(template).header"
                :message="mapTemplateToPreview(template).message"
                :footer="mapTemplateToPreview(template).footer"
                :buttons="mapTemplateToPreview(template).buttons"
                class="w-[90%] mx-3 my-3"
                headerTextClass="text-xs"
                messageClass="text-xs"
                footerClass="text-xs"
            />
          </div>
        </SimpleBar>
        </div>
        <div class="text-center" v-if="categories.length === 0">no boards found</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { SimpleBar } from "simplebar-vue3";
  import { useTemplateLibraryStore } from '@/store/TemplateLibrary';
  import Preview from './Preview';
  
  const { templates } = useTemplateLibraryStore();
  
  const categories = computed(() => Array.from(new Set(templates.value.map((template) => template.category))));
  
  function getTemplatesByCategory(category) {
    return templates.value.filter((template) => template.category === category);
  }
  
  function templatesCountByCategory(category) {
    return getTemplatesByCategory(category).length;
  }
  
  function mapTemplateToPreview(template) {
    const preview = {
      header: {
        img: template.header_media || '',
        text: template.header_text || '',
      },
      message: template.body || '',
      footer: template.footer || '',
      buttons: template.button || '',
    };
    return preview;
  }

  
  </script>
  
