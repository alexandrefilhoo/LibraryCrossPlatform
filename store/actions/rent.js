export const ADD_TO_RENT = 'ADD_TO_RENT';
export const REMOVE_FROM_RENT = 'REMOVE_FROM_RENT'

export const addToRent = book => {
    return { type: ADD_TO_RENT, book: book }
}

export const removeFromRent = bookId => {
    return { type: REMOVE_FROM_RENT, bid: bookId }
}