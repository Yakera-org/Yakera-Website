import {createSlice} from "@reduxjs/toolkit"
export const userSlice = createSlice({
    name: "user",
    initialState: {
        "email": "",
        "firstname": "",
        "lastname": "",
        "phone": "",
        "address": "",
        "socialID": "",
        "airTMID": "",
        "campaign": [],
    },
    reducers: {
        setUser: (state, action) => {
            return state = action.payload
        }
    }
})

export const {setUser} = userSlice.actions
export const selectUser = state => state.user
export default userSlice.reducer