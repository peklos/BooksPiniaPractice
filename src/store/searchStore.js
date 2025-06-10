import { defineStore } from "pinia";
import { useBookStore } from "./bookStore";
import { ref } from "vue";

// export const useSearchStore = defineStore("searchStore", {
//   state: () => ({
//     books: [],
//     loader: false,
//     errorMessage: '',
//   }),
//   actions: {
//     async getBooks(search) {
//       if (!search) return [];
//       const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
//         search
//       )}`;

//       try {
//         this.errorMessage = '';
//         this.loader = true;
//         const response = await fetch(url);

//         const data = await response.json();

//         if (!data.items?.length) {
//           this.errorMessage = 'Книг не найдено'
//         }

//         this.books = data.items;
//         this.loader = false;
//         return data.items || [];
//       } catch (error) {
//         console.error("Ошибка при поиске книг:", error);
//         return [];
//       }
//     },

//     addToUserBooks(object) {
//       const bookStore = useBookStore();
//       let lastId =
//         bookStore.books.length > 0
//           ? Math.max(...bookStore.books.map((book) => book.id))
//           : 0;

//       function generateId() {
//         return ++lastId;
//       }

//       bookStore.books.push({ ...object, isRead: false, id: generateId() });
//     },
//   },
// });

export const useSearchStore = defineStore("searchStore", () => {
  const books = ref([]);
  const loader = ref(false);
  const errorMessage = ref("");

  const getBooks = async (search) => {
    if (!search) return [];
    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
      search
    )}`;

    try {
      errorMessage.value = "";
      loader.value = true;
      const response = await fetch(url);

      const data = await response.json();

      if (!data.items?.length) {
        errorMessage.value = "Книг не найдено";
      }

      books.value = data.items;
      loader.value = false;
      return data.items || [];
    } catch (error) {
      console.error("Ошибка при поиске книг:", error);
      return [];
    }
  };

  const addToUserBooks = (object) => {
    const bookStore = useBookStore();
    let lastId =
      bookStore.books.length > 0
        ? Math.max(...bookStore.books.map((book) => book.id))
        : 0;

    function generateId() {
      return ++lastId;
    }

    bookStore.books.push({ ...object, isRead: false, id: generateId() });
  };

  return {
    books, loader, errorMessage, getBooks, addToUserBooks
  }
});
