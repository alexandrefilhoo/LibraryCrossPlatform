import React, { useState } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import booksReducer from './store/reducers/books'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import rentReducer from './store/reducers/rent'
import reservationsReducer from './store/reducers/reservations'
import LibraryNavigator from './navigation/LibraryNavigator';
import  ReduxThunk from 'redux-thunk'
import  loginSignUpReducer from './store/reducers/loginsignup'

const rootReducer = combineReducers({
  books: booksReducer,
  rent: rentReducer,
  reservations: reservationsReducer,
  loginSignUp: loginSignUpReducer
})

const libraryStore = createStore(rootReducer,applyMiddleware(ReduxThunk))

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./fonts/OpenSans-Bold.ttf')
  });
}
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}

      />
    )
  }
  return (
    <Provider store={libraryStore}>
      <LibraryNavigator />
    </Provider>
  );
}

