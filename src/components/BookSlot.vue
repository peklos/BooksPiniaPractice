<template>
  <div class="mb-8">
    <div class="flex items-center gap-4 mb-4">
      <img
        :src="book.cover"
        :alt="book.title"
        class="w-32 h-auto object-cover rounded-lg shadow-lg"
        loading="lazy"
      />
      <div class="text-left">
        <h3 class="text-xl font-bold mb-2">{{ book.title }}</h3>
        <p class="text-gray-600">{{ book.overview }}</p>
        <p class="mt-2 font-bold">Год выпуска: {{ book.year }}</p>
      </div>
    </div>
    <div class="flex justify-start">
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
        @click="bookStore.deleteFromStore(book.id)"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import { useBookStore } from "../store/bookStore";

export default {
  data() {
    return {
      bookStore: useBookStore(),
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