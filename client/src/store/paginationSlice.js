import {createSlice} from '@reduxjs/toolkit'


const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        productPerPage: 8,
    },
    reducers: {
        changeProductPerPage: (state, {payload}) => {
            state.productPerPage = payload
        }
    }
})

export const {changeProductPerPage} = paginationSlice.actions
export default paginationSlice