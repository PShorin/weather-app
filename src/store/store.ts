import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/WeatherSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

// Типы для RootState и AppDispatch
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Экспорт типизированных хуков
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;