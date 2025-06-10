<template>
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <img
        :src="book.imageLinks?.smallThumbnail"
        :alt="book.title"
        class="w-32 h-auto object-cover rounded-lg shadow-lg"
        loading="lazy"
      />
      <div class="text-left">
        <h3 class="text-xl font-bold mb-2">{{ book.title }}</h3>
        <p class="text-gray-600">{{ book.description }}</p>
        <p class="mt-2 font-bold">Год выпуска: {{ book.publishedDate }}</p>
      </div>
    </div>
    <div class="flex justify-center" v-if="bookStore.activeTab == 1">

      <button
        class="bg-green-300 rounded-lg px-4 py-1 shadow-md mr-4 font-bold hover:bg-green-400 transition"
        @click="searchStore.addToUserBooks(book)"
        v-if="!bookStore.books.some(el => el.title === book.title)"
      >
        Добавить
      </button>

      <button
        class="bg-green-500 rounded-lg px-4 py-1 shadow-md mr-4 font-bold hover:bg-green-400 transition"
        @click="bookStore.deleteFromStoreByTitle(book.title)"
        v-if="bookStore.books.some(el => el.title === book.title)"
      >
        Добавлено 
      </button>

    </div>
    <div class="flex justify-start" v-if="bookStore.activeTab != 1">
      <button
        class="bg-orange-300 rounded-lg px-4 py-1 shadow-md mr-4 font-bold hover:bg-orange-400 transition"
        v-if="!book.isRead"
        @click="bookStore.toggleReadStatus(book.id)"
      >
        Прочитано
      </button>
      <button
        class="bg-orange-300 rounded-lg px-4 py-1 shadow-md mr-4 font-bold hover:bg-orange-400 transition"
        v-if="book.isRead"
        @click="bookStore.toggleReadStatus(book.id)"
      >
        Не прочитано
      </button>
      <button
        class="bg-red-400 rounded-lg px-4 py-1 shadow-md font-bold hover:bg-red-500 transition"
        @click="bookStore.deleteFromStoreByID(book.id)"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import { useBookStore } from "../store/bookStore";
import {useSearchStore} from '../store/searchStore';

export default {
  data() {
    return {
      bookStore: useBookStore(),
      searchStore: useSearchStore(),
    };
  },

  props: {
    book: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
};
</script>