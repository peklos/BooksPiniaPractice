<template>
  <form class="flex" @submit.prevent="searchStore.getBooks(searchBook)">
    <input
      type="text"
      placeholder="Введите название книги"
      v-model="searchBook"
      class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    />
  </form>
  <button @click="searchStore.getBooks(searchBook); searchStore.errorMessage = ''" class="bg-blue-300 px-6 py-2 my-2 rounded-lg shadow-lg hover:bg-blue-400 transition font-bold">Поиск</button>
  <p v-if="searchStore.errorMessage != null" class="text-red-500 text-shadow font-bold">{{ searchStore.errorMessage }}</p>
  <Loader v-if="searchStore.loader"/>
  <book-slot-vue v-else v-for="book in searchStore.books" :key="book.id" :book="book.volumeInfo"/>
</template>

<script>
import { useSearchStore } from "../store/searchStore.js";
import BookSlotVue from './BookSlotSearch.vue';
import Loader from './LoaderCircle.vue'

export default {
  data() {
    return {
      searchBook: "",
      searchStore: useSearchStore(),
    };
  },

  components: {
    BookSlotVue,
    Loader,
  },
};
</script>

<style scoped>

.text-shadow {
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

</style>