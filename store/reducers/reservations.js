import Reservation from "../../models/reservation"
import { ADD_RESERVATION, SET_RESERVATIONS } from "../actions/reservations"

const initialState = {
    reservations: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_RESERVATION:
            const newReservation = new Reservation(
                action.reservationData.id,
                action.reservationData.items,
                action.reservationData.amount,
                action.reservationData.date
            )
            return {
                ...state,
                reservations: state.reservations.concat(newReservation)
            }
        case SET_RESERVATIONS:
            return {
                reservations: action.reservations
            }
    }
    return state
}