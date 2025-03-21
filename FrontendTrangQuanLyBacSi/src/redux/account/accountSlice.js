import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: !!localStorage.getItem('access_tokenDoctor'),
    isLoading: true,
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('access_tokenDoctor') || null,
};

const accountDoctorSlice = createSlice({
    name: "accountDoctor",
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem('access_tokenDoctor', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user)); // Chuỗi hóa lại đúng cách
        },
        doLogoutAction: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = {};
            localStorage.removeItem('access_tokenDoctor');
            localStorage.removeItem('user');
        }
    }
});

export const { doLoginAction, doLogoutAction } = accountDoctorSlice.actions;
export default accountDoctorSlice.reducer;
