import { ADD_TO_RENT, REMOVE_FROM_RENT } from "../actions/rent";
import RentItem from "../../models/rent-item";
import CartRentItem from "../../components/libraryShop/CartRentItem";
import { ADD_RESERVATION } from "../actions/reservations";
import { DELETE_BOOK } from "../actions/books";

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_RENT:
            const addedBook = action.book;
            const bookPrice = addedBook.price
            const bookTitle = addedBook.title

            let updatedOrNewRentItem;

            if (state.items[addedBook.id]) {
                updatedOrNewRentItem = new RentItem(
                    state.items[addedBook.id].quantity + 1,
                    bookPrice,
                    bookTitle,
                    state.items[addedBook.id].sum + bookPrice
                )

            } else {
                updatedOrNewRentItem = new RentItem(1, bookPrice, bookTitle, bookPrice)
            }
            return {
                ...state,
                items: { ...state.items, [addedBook.id]: updatedOrNewRentItem },
                totalAmount: state.totalAmount + bookPrice
            }
        case REMOVE_FROM_RENT:
            const selectedCartRentBook = state.items[action.bid]
            const currentQty = selectedCartRentBook.quantity;

            let updatedCartRentBooks;
            if (currentQty > 1) {
                const updatedCartRentBook = new RentItem(
                    selectedCartRentBook.quantity - 1,
                    selectedCartRentBook.bookRentPrice,
                    selectedCartRentBook.bookTitle,
                    selectedCartRentBook.sum - selectedCartRentBook.bookRentPrice
                )
                updatedCartRentBooks = { ...state.items, [action.bid]: updatedCartRentBook }
            } else {
                updatedCartRentBooks = { ...state.items };
                delete updatedCartRentBooks[action.bid]
            }
            return {
                ...state,
                items: updatedCartRentBooks,
                totalAmount: state.totalAmount - selectedCartRentBook.bookRentPrice
            }
        //To clear the cart rent
        case ADD_RESERVATION:
            return initialState;

        case DELETE_BOOK:
            if (!state.items[action.bid]) {
                return state;
            }
            const updatedItems = { ...state.items }
            const itemTotal = state.items[action.bid].sum
            delete updatedItems[action.bid]
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
    }
    return state;
}