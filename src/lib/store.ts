import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import cacheReducer from "./slices/cache-slice";
import searchReducer from "./slices/search-slice";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["search"],
};

const cachePersistConfig = {
  key: "cache",
  storage,
  whitelist: ["ingridients", "ingridientCache", "keywordsCache"],
};

const rootReducer = combineReducers({
  cache: persistReducer(cachePersistConfig, cacheReducer),
  search: searchReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });
};

const store = makeStore();
const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export { store, persistor };
