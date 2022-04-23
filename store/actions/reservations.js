import Reservation from "../../models/reservation"

export const ADD_RESERVATION = 'ADD_RESERVATION'
export const SET_RESERVATIONS = 'SET_RESERVATIONS'



export const fetchReservations = () => {
    return async (dispatch, getState) => {

        const userId = getState().loginSignUp.userId
        try {

            const response = await fetch(`https://rn-library-application-ddbea-default-rtdb.europe-west1.firebasedatabase.app/reservations/${userId}.json`, {
                method: 'GET',
            })

            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const resData = await response.json();
            console.log(resData)
            const loadedReservations = [];

            for (const key in resData) {
                loadedReservations.push(new Reservation(
                    key,
                    resData[key].bookRentItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ))
            }
            dispatch({ type: SET_RESERVATIONS, reservations: loadedReservations })
        } catch (error) {
            throw error;
        }
    }
}


export const addReservation = (bookRentItems, totalAmount) => {
    return async (dispatch, getState) => {
        const date = new Date();
        const token = getState().loginSignUp.token
        const userId = getState().loginSignUp.userId
        const response = await fetch(`https://rn-library-application-ddbea-default-rtdb.europe-west1.firebasedatabase.app/reservations/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            //Firebase will generate a ID automatically
            body: JSON.stringify({
                bookRentItems,
                totalAmount,
                date: date.toISOString()
            })
        })

        if (!response.ok) {
            throw new Error('Something wrong happened!')
        }

        const resData = await response.json();

        dispatch({
            type: ADD_RESERVATION,
            reservationData: { id: resData.name, items: bookRentItems, amount: totalAmount, date: date }
        })
    }
}
