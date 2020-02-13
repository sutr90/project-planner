import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './index'

export default function configureAppStore(preloadedState = {}) {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [...getDefaultMiddleware()],
        preloadedState
    });

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./index', () => store.replaceReducer(rootReducer))
    }
    return store
}