import { ref } from "vue";

const config = useRuntimeConfig();
const apiUrl = config.public.equran;

export const useQuranService = () => {
  const surahs = ref([]);

  const fetchSurahs = async () => {
    try {
      const response = await fetch(`${apiUrl}`);
      const data = await response.json();
      if (data.code === 200) {
        surahs.value = data.data;
      }
    } catch (error) {
      console.error("Error fetching surahs:", error);
    }
  };

  return {
    surahs,
    fetchSurahs,
  };
};
