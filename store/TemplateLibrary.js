import { ref, onMounted } from 'vue';
import { getTemplateLibraryApi } from '@/api';

const templates = ref([]);

export function useTemplateLibraryStore() {
  onMounted(async () => {
    templates.value = await getTemplateLibraryApi();
  });

  return {
    templates,
  };
}