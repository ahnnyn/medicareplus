import { createSlice } from '@reduxjs/toolkit';

// Khởi tạo state từ localStorage
const initialState = {
    isAuthenticated: !!localStorage.getItem('access_token'),
    isLoading: true,
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('access_token') || null,
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;

            // Lưu vào localStorage
            localStorage.setItem('access_token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        doGetAccountAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload.user;
        },
        doLogoutAction: (state) => {
            // Xóa khỏi localStorage
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');

            // Reset redux state
            state.isAuthenticated = false;
            state.token = null;
            state.user = {};
        },
    },
    extraReducers: (builder) => {
        // Có thể bổ sung sau nếu dùng createAsyncThunk
    },
});

export const { doLoginAction, doGetAccountAction, doLogoutAction } = accountSlice.actions;

export default accountSlice.reducer;
