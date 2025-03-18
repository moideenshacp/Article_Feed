import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  firstName: string;
  email: string;
  lastName?: string;
  phone: string
  preferences: string[];
  dob?: string;
  image:string,
  blockedArticles?:string[]
}

// Define the initial state type
interface userState {
  user: User | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: userState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      },
      updateBlock(state, action: PayloadAction<{ articleId: string, isBlocked: boolean }>) {
        if (state.user) {
          if (action.payload.isBlocked) {
            //  Add article to blockedArticles if blocked
            state.user.blockedArticles = [...(state.user.blockedArticles || []), action.payload.articleId];
          } else {
            //  Remove article from blockedArticles if unblocked
            state.user.blockedArticles = state.user.blockedArticles?.filter(id => id !== action.payload.articleId) || [];
          }
        }
      }
  },
});

export const {
  login,
  logout,
  updateUser,
  updateBlock
} = userSlice.actions;
export default userSlice.reducer;
