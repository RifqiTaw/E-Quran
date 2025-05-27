<script lang="ts" setup>
import { ref, onMounted } from "vue";

const prayerTimes = ref<Record<string, string>>({});
const location = ref<string>("...loading lokasi...");
const city = ref<string>("...loading kota...");
const country = ref<string>("...loading negara...");
const today = new Date();

const config = useRuntimeConfig();

const openCageAPIKey = config.public.openCageAPIKey;

async function getCityAndCountry(lat: number, lng: number) {
  const { data, error } = await useFetch(() => {
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${openCageAPIKey}&language=id`;
    return apiUrl;
  });

  if (error.value) {
    city.value = "";
    country.value = "";
    return;
  }

  const results = data.value?.results[0];
  if (results) {
    city.value = results.components.city || "Kota tidak ditemukan";
    country.value = results.components.country || "Negara tidak ditemukan";
  } else {
    city.value = "Kota tidak ditemukan";
    country.value = "Negara tidak ditemukan";
  }

  // try {
  //   const response = await fetch(apiUrl);
  //   const data = await response.json();
  //   if (data.results && data.results.length > 0) {
  //     const result = data.results[0];
  //     city.value = result.components.city || "Kota tidak ditemukan";
  //     country.value = result.components.country || "Negara tidak ditemukan";
  //   } else {
  //     city.value = "Kota tidak ditemukan";
  //     country.value = "Negara tidak ditemukan";
  //   }
  // } catch (error) {
  //   console.error("Error fetching city and country:", error);
  //   city.value = "Error";
  //   country.value = "Error";
  // }
}

// Mengambil waktu sholat berdasarkan koordinat
async function fetchPrayerTimes(lat: number, lng: number) {
  const apiUrl = `http://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`; // Method=2 for ISNA calculation
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.code === 200) {
      prayerTimes.value = data.data.timings;
    } else {
      location.value = "Error fetching prayer times";
    }
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    location.value = "Failed to load prayer times";
  }
}

// Mendapatkan lokasi pengguna
const getLocation = () => {
  if (!navigator.geolocation) {
    location.value = "Geolocation tidak didukung browser";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      location.value = `Lat: ${lat.toFixed(2)}, Lng: ${lng.toFixed(2)}`;
      getCityAndCountry(lat, lng); // Mendapatkan kota dan negara
      fetchPrayerTimes(lat, lng);
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          location.value = "User menolak akses lokasi.";
          break;
        case error.POSITION_UNAVAILABLE:
          location.value = "Lokasi tidak tersedia.";
          break;
        case error.TIMEOUT:
          location.value = "Permintaan lokasi timeout.";
          break;
        default:
          location.value = "Terjadi kesalahan saat mengambil lokasi.";
      }
      // fallback lokasi Jakarta
      fetchPrayerTimes(-6.2088, 106.8456);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
  );
};

onMounted(() => {
  getLocation();
});
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 mt-12 rounded-lg shadow-xl">
    <h1 class="text-center text-3xl font-semibold text-white mb-6">
      Jadwal Sholat Hari Ini
    </h1>

    <!-- Menampilkan Kota dan Negara dengan Kartu -->
    <div class="text-center mb-6">
      <div class="bg-white p-4 rounded-lg shadow-md text-gray-800">
        <p class="text-lg font-semibold">
          Kota: <span class="font-normal">{{ city }}</span>
        </p>
        <p class="text-lg font-semibold">
          Negara: <span class="font-normal">{{ country }}</span>
        </p>
      </div>
    </div>

    <!-- Menampilkan Waktu Sholat -->
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div
        class="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between text-gray-800"
      >
        <div>
          <i class="fas fa-sun text-yellow-500 text-xl"></i>
          <p class="mt-2 font-semibold">Subuh</p>
        </div>
        <p class="text-xl">{{ prayerTimes.Fajr || "-" }}</p>
      </div>

      <div
        class="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between text-gray-800"
      >
        <div>
          <i class="fas fa-sun text-yellow-600 text-xl"></i>
          <p class="mt-2 font-semibold">Dzuhur</p>
        </div>
        <p class="text-xl">{{ prayerTimes.Dhuhr || "-" }}</p>
      </div>

      <div
        class="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between text-gray-800"
      >
        <div>
          <i class="fas fa-sun text-yellow-700 text-xl"></i>
          <p class="mt-2 font-semibold">Ashar</p>
        </div>
        <p class="text-xl">{{ prayerTimes.Asr || "-" }}</p>
      </div>

      <div
        class="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between text-gray-800"
      >
        <div>
          <i class="fas fa-sun text-orange-500 text-xl"></i>
          <p class="mt-2 font-semibold">Maghrib</p>
        </div>
        <p class="text-xl">{{ prayerTimes.Maghrib || "-" }}</p>
      </div>

      <div
        class="bg-white p-4 rounded-lg shadow-lg flex items-center justify-between text-gray-800"
      >
        <div>
          <i class="fas fa-moon text-indigo-500 text-xl"></i>
          <p class="mt-2 font-semibold">Isya</p>
        </div>
        <p class="text-xl">{{ prayerTimes.Isha || "-" }}</p>
      </div>
    </div>
  </div>
</template>
