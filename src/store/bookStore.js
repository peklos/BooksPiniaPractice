import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

// 1 код в стиле OptionsAPI (закомментированный)
// 2 код в стиле CompositionAPI (рабочий)

// export const useBookStore = defineStore("bookStore", {
//   state: () => ({
//     books: [],
//     activeTab: 1
//   }),
//   getters: {
//     booksReadTrue() {
//       return this.books.filter((el) => el.isRead == true);
//     },

//     booksReadFalse() {
//       return this.books.filter((el) => el.isRead == false);
//     }
//   },
//   actions: {
//     toggleReadStatus(id) {
//       const idx = this.books.findIndex(el => el.id === id)

//       this.books[idx].isRead = !this.books[idx].isRead;
//     },

//     deleteFromStoreByID(idBook) {
//       this.books = this.books.filter((el) => el.id != idBook);
//     },

//     deleteFromStoreByTitle(titleBook){
//       this.books = this.books.filter((el) => el.title != titleBook)
//     },

//     setActiveTab(id) {
//       if (this.activeTab != id) {
//         this.activeTab = id
//       }
//     }
//   },
// });

export const useBookStore = defineStore("bookStore", () => {
  const books = ref([]);
  const activeTab = ref(1);
  const booksInLocalStorage = localStorage.getItem("books");

  if (booksInLocalStorage) {
    try {
      books.value = JSON.parse(booksInLocalStorage);
    } catch (e) {
      console.error("Ошибка при парсинге: ", e);
      localStorage.removeItem('books')
    }
  }

  const toggleReadStatus = (id) => {
    const idx = books.value.findIndex((el) => el.id === id);

    books.value[idx].isRead = !books.value[idx].isRead;
  };

  const deleteFromStoreByID = (idBook) => {
    books.value = books.value.filter((el) => el.id != idBook);
  };

  const deleteFromStoreByTitle = (titleBook) => {
    books.value = books.value.filter((el) => el.title != titleBook);
  };

  const setActiveTab = (id) => {
    if (activeTab.value != id) {
      activeTab.value = id;
    }
  };

  const booksReadTrue = computed(() => {
    return books.value.filter((el) => el.isRead === true);
  });

  const booksReadFalse = computed(() => {
    return books.value.filter((el) => el.isRead === false);
  });

  watch(
    books,
    (newBooks) => {
      localStorage.setItem('books', JSON.stringify(newBooks));
    }, {deep: true}
  )

  return {
    books,
    activeTab,
    toggleReadStatus,
    deleteFromStoreByID,
    deleteFromStoreByTitle,
    setActiveTab,
    booksReadTrue,
    booksReadFalse,
  };
});
