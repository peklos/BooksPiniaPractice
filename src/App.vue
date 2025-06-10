<template>
  <div class="flex items-center justify-center mt-10">
    <div
      class="bg-blue-100 p-8 rounded-2xl shadow-lg max-w-xl w-full text-center"
    >
      <h2 class="text-2xl font-bold text-blue-800 mb-4">Привет, мир!</h2>
      <p class="text-gray-700 mb-6">Это красивый закругленный блок с тенью.</p>
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition mr-2 disabled:bg-blue-300"
        :disabled="bookStore.activeTab != 1"
        @click="bookStore.setActiveTab(0)"
      >
        Фаворит
      </button>
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition ml-2 disabled:bg-blue-300"
        :disabled="bookStore.activeTab == 1"
        @click="bookStore.setActiveTab(1)"
      >
        Поиск
      </button>

      <div>
        <h1
          class="mt-2 bg-yellow-100 inline-block p-2 rounded-lg shadow-lg"
          v-if="bookStore.activeTab != 1"
        >
          В планах:
          <div class="bg-yellow-100 p-2 rounded-2xl max-w-xl w-full mt-6">
            <p class="font-bold text-left mb-4">Прочитано ({{bookStore.booksReadTrue.length}}):</p>
            <BookSlot
              v-for="book of bookStore.booksReadTrue"
              :key="book.id"
              :book="book"
            />

            <p class="font-bold text-left mb-4">Не прочитано({{bookStore.booksReadFalse.length}}):</p>
            <BookSlot
              v-for="book of bookStore.booksReadFalse"
              :key="book.id"
              :book="book"
            />

            <p class="font-bold text-left mb-4">Все книги({{bookStore.books.length}}):</p>
            <BookSlot
              v-for="book of bookStore.books"
              :key="book.id"
              :book="book"
            />
          </div>
        </h1>
        <h1
          class="mt-2 bg-yellow-100 inline-block p-2 rounded-lg shadow-lg"
          v-if="bookStore.activeTab == 1"
        >
          Все книги:
          <SearchBooks />
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { useBookStore } from "./store/bookStore";
import BookSlot from "./components/BookSlotSearch.vue";
import SearchBooks from './components/SearchBooks.vue';

export default {
  data() {
    return {
      bookStore: useBookStore(),
    };
  },
  components: {
    BookSlot,
    SearchBooks,
  },
};
</script>

