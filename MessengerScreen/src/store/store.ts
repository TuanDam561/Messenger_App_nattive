import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./reducer/testReducer";

export const store = configureStore({
  reducer: {
    // Thêm các slice reducer ở đây
    test: testReducer,
  },
  devTools: __DEV__,
});

// 👇 Type cho toàn app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
