import Book from "../../models/book";

export const DELETE_BOOK = 'DELETE_BOOK'
export const CREATE_BOOK = 'CREATE_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const SET_BOOKS = 'SET_BOOKS';


export const fetchBooks = () => {
    return async ( dispatch,getState) => {

        const userId = getState().loginSignUp.userId

        try {

            const response = await fetch('https://rn-library-application-ddbea-default-rtdb.europe-west1.firebasedatabase.app/books.json', {
                method: 'GET',
            })

            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const resData = await response.json();
            console.log(resData)
            const loadedBooks = [];

            for (const key in resData) {
                loadedBooks.push(new Book(
                    key,
                    resData[key].ownerId,
                    resData[key].category,
                    resData[key].isbn,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].pages,
                    resData[key].author,
                    resData[key].year,
                    resData[key].edition,
                    resData[key].publisher,
                    resData[key].price,
                ))
            }
            dispatch({ type: SET_BOOKS, books: loadedBooks,userBooks: loadedBooks.filter(book => book.ownerId === userId) })
        }
        catch (error) {
            throw error;
        }
    }
}

export const deleteBook = bookId => {
    return async (dispatch,getState) => {

        const token = getState().loginSignUp.token

        const response = await fetch(`https://rn-library-application-ddbea-default-rtdb.europe-west1.firebasedatabase.app/books/${bookId}.json?auth=${token}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error('Something went wrong!')
        }

        dispatch({ type: DELETE_BOOK, bid: bookId })
    }
}

export const createBook = (category, isbn, title, imageUrl, description, pages, author, year, edition, publisher, price) => {

    return async (dispatch, getState) => {

        const token = getState().loginSignUp.token
        const userId = getState().loginSignUp.userId

        //Get the url from firebase project and books.json to create a folder in the firebase
        const response = await fetch(`https://rn-library-application-ddbea-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            //Firebase will generate a ID automatically
            body: JSON.stringify({
                category,
                isbn,
                title,
                imageUrl,
                description,
                pages,
                author,
                year,
                edition,
                publisher,
                price,
                ownerId: userId 
            })
        })

        const resData = await response.json();

        console.log(resData)//Returns the  book ID number on the terminal

        dispatch({
            type: CREATE_BOOK,
            bookData: {
                id: resData.name,
                category,
                isbn,
                title,
                imageUrl,
                description,
                pages,
                author,
                year,
                edition,
                publisher,
                price,
                ownerId: userId
            }
        });
    }
}


export const updateBook = (id, category, isbn, title, imageUrl, description, pages, author, year, edition, publisher) => {

    return async (dispatch, getState) => {

        const token = getState().loginSignUp.token
        // console.log(getState())
        const response = await fetch(`https://rn-library-application-ddbea-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                category,
                isbn,
                title,
                imageUrl,
                description,
                pages,
                author,
                year,
                edition,
                publisher,
            })
        })

        if (!response.ok) {
            throw new Error('Something went wrong!')
        }

        dispatch({
            type: UPDATE_BOOK,
            bid: id,
            bookData: {
                category,
                isbn,
                title,
                imageUrl,
                description,
                pages,
                author,
                year,
                edition,
                publisher
            }
        })
    }

}
