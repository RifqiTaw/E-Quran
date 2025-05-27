<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-3xl font-bold mb-6">Daftar Surah Quran</h1>

    <!-- Fitur Pencarian -->
    <div class="mb-4">
      <input
        type="text"
        v-model="searchQuery"
        class="input input-bordered w-full md:w-1/3"
        placeholder="Cari surah..."
        @input="searchSurahs"
      />
    </div>

    <!-- Tampilkan jika data masih dalam proses loading -->
    <div v-if="surahs.length === 0" class="text-center">Loading...</div>

    <!-- Tampilkan data surah menggunakan card -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="surah in paginatedSurahs"
        :key="surah.nomor"
        class="card w-full max-w-sm bg-amber-50 shadow-xl text-indigo-950 rounded-lg"
      >
        <div class="card-body">
          <h2 class="card-title text-xl font-semibold">
            {{ surah.namaLatin }}
          </h2>
          <p
            class="text-gray-600 text-sm"
            v-html="getLimitedDescription(surah.deskripsi)"
          ></p>
          <div class="mt-4">
            <p class="text-sm font-semibold">
              Jumlah Ayat: {{ surah.jumlahAyat }}
            </p>
            <p class="text-sm font-semibold">
              Tempat Turun: {{ surah.tempatTurun }}
            </p>
          </div>
          <div class="card-actions mt-4 flex justify-between items-center">
            <!-- Tombol untuk memutar audio -->
            <button class="btn btn-primary" @click="playAudio(surah.nomor)">
              Play Audio
            </button>
            <!-- Tombol untuk menampilkan tafsir -->
            <button
              class="btn btn-secondary"
              @click="toggleTafsir(surah.nomor)"
            >
              Lihat Tafsir
            </button>
          </div>
        </div>

        <!-- Tampilkan tafsir -->
        <div v-if="activeTafsir === surah.nomor" class="p-4 border-t">
          <h3 class="font-semibold">Tafsir:</h3>
          <!-- Batasi hanya 5 baris tafsir yang ditampilkan -->
          <div
            v-for="(tafsir, index) in tafsirContent.slice(0, 5)"
            :key="index"
            class="mb-2"
          >
            <p class="font-semibold">Ayat {{ tafsir.ayat }}:</p>
            <p v-html="tafsir.teks"></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-6">
      <button
        :disabled="currentPage === 1"
        @click="currentPage--"
        class="btn btn-secondary mx-2"
      >
        Previous
      </button>
      <button
        :disabled="currentPage === totalPages"
        @click="currentPage++"
        class="btn btn-secondary mx-2"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Mengambil data dari API menggunakan useAsyncData
const { data: surahs } = await useAsyncData("surahs", () =>
  fetch(useRuntimeConfig().public.equran)
    .then((response) => response.json())
    .then((data) => data.data)
);

const searchQuery = ref(""); // Model pencarian
const currentPage = ref(1); // Halaman saat ini
const perPage = 10; // Jumlah surah per halaman
const activeTafsir = ref<number | null>(null); // Surah yang sedang melihat tafsir
const tafsirContent = ref<any[]>([]); // Isi tafsir

// Fungsi untuk memotong deskripsi
const getLimitedDescription = (description: string) => {
  const limit = 100; // Batasi deskripsi menjadi 100 karakter
  return description.length > limit
    ? description.substring(0, limit) + "..."
    : description;
};

// Pencarian surah berdasarkan nama atau deskripsi
const searchSurahs = () => {
  currentPage.value = 1; // Reset ke halaman pertama saat pencarian baru dilakukan
};

// Menghitung surah yang sesuai dengan pencarian
const filteredSurahs = computed(() => {
  return surahs.value.filter(
    (surah: { namaLatin: string; arti: string; deskripsi: string }) => {
      const lowercasedQuery = searchQuery.value.toLowerCase();
      return (
        surah.namaLatin.toLowerCase().includes(lowercasedQuery) ||
        surah.arti.toLowerCase().includes(lowercasedQuery) ||
        surah.deskripsi.toLowerCase().includes(lowercasedQuery)
      );
    }
  );
});

// Pagination logic
const totalPages = computed(() => {
  return Math.ceil(filteredSurahs.value.length / perPage);
});

const paginatedSurahs = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  const end = currentPage.value * perPage;
  return filteredSurahs.value.slice(start, end);
});

// Fungsi untuk memutar audio
const playAudio = (nomor: number) => {
  const surah = surahs.value.find((s: { nomor: number }) => s.nomor === nomor);
  if (surah && surah.audioFull) {
    const audioUrl = surah.audioFull["01"]; // Pilih audio dari qari pertama
    const audio = new Audio(audioUrl);
    audio.play();
  }
};

// Fungsi untuk menampilkan tafsir menggunakan useAsyncData
const toggleTafsir = async (nomor: number) => {
  if (activeTafsir.value === nomor) {
    // Jika tafsir sudah terbuka, tutup
    activeTafsir.value = null;
    tafsirContent.value = [];
  } else {
    // Ambil tafsir baru untuk surah yang dipilih menggunakan useAsyncData
    activeTafsir.value = nomor;
    const { data } = await useAsyncData(
      `tafsir-${nomor}`,
      () =>
        fetch(`${useRuntimeConfig().public.tafsir}/${nomor}`)
          .then((response) => response.json())
          .then((data) => data.data.tafsir) // Ambil hanya key 'tafsir' dari data
    );
    tafsirContent.value = data.value || []; // Set tafsirContent hanya dengan data tafsir
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.card-body {
  padding: 1.5rem;
}
</style>
