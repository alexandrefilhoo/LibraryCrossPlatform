import BOOKS from "../../data/dummy-data";
import Book from "../../models/book";
import { CREATE_BOOK, DELETE_BOOK, SEARCH_BOOKS, SET_BOOKS, UPDATE_BOOK } from "../actions/books";

const initialState = {
    availableBooks: [],
    userBooks: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKS:
            return {
                availableBooks: action.books,
                userBooks: action.userBooks
            }
        case CREATE_BOOK:
            const newBook = new Book(
                action.bookData.id,
                action.bookData.ownerId,
                action.bookData.category,
                action.bookData.isbn,
                action.bookData.title,
                action.bookData.imageUrl,
                action.bookData.description,
                action.bookData.pages,
                action.bookData.author,
                action.bookData.year,
                action.bookData.edition,
                action.bookData.publisher,
                action.bookData.price
            )
            return {
                ...state,
                availableBooks: state.availableBooks.concat(newBook),
                userBooks: state.userBooks.concat(newBook)
            }
        case UPDATE_BOOK:
            const bookIndex = state.userBooks.findIndex(book => book.id === action.bid)
            const updatedBook = new Book(action.bid,
                state.userBooks[bookIndex].ownerId,
                action.bookData.category,
                action.bookData.isbn,
                action.bookData.title,
                action.bookData.imageUrl,
                action.bookData.description,
                action.bookData.pages,
                action.bookData.author,
                action.bookData.year,
                action.bookData.edition,
                action.bookData.publisher,
                state.userBooks[bookIndex].price,
            )

            const updatedUserBooks = [...state.userBooks]
            updatedUserBooks[bookIndex] = updatedBook;
            const availableBookIndex = state.availableBooks.findIndex(book => book.id === action.bid)
            const updatedAvailableBooks = [...state.availableBooks]
            updatedAvailableBooks[availableBookIndex] = updatedBook
            return {
                ...state,
                availableBooks: updatedAvailableBooks,
                userBooks: updatedUserBooks
            }

        case DELETE_BOOK:
            return {
                ...state,
                userBooks: state.userBooks.filter(book => book.id !== action.bid),
                availableBooks: state.availableBooks.filter(book => book.id !== action.bid)
            }
        case SEARCH_BOOKS:
            return {
                ...state,
                userBooks: state.userBooks.filter(book => book.id !== action.bid),
                availableBooks: state.availableBooks.filter(book => book.id !== action.bid)
            }
    }
    return state;
}
