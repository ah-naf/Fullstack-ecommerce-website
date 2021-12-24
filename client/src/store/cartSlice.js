import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

toast.configure();

export const asyncCartAdd = createAsyncThunk('cart/asyncCartAdd', async (payload) => {
    const res = await fetch('https://ahnaf-ecommerce-website.herokuapp.com/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'token': payload.token
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()
    if(!res.ok) {
        toast.error(data.message, {
            position:'top-center'
        })
        return []
    } 
    toast.success('Item added successfully', {
        position: 'top-center'
    }) 
    return data
})

export const asyncCartGet = createAsyncThunk('cart/asyncCartGet', async (payload) => {
    const res = await fetch('https://ahnaf-ecommerce-website.herokuapp.com/api/cart', {
        headers: {
            'token': payload
        }
    })
    const data = await res.json()
    if(res.ok) {
        return data
    }
})

export const asyncCartEdit = createAsyncThunk('cart/asyncCartEdit', async (payload) => {
    const res = await fetch(`https://ahnaf-ecommerce-website.herokuapp.com/api/cart/${payload.id}`, {
        method: 'PUT',
        headers: {
            'token' : payload.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity : payload.quantity})
    })
    const data = await res.json()
    if(!res.ok) {
        toast.error(data.message, {position : 'top-center'})
    }
    return data
})

export const asyncCartDelete = createAsyncThunk('cart/asyncCartDelete', async (payload) => {
    const res = await fetch(`https://ahnaf-ecommerce-website.herokuapp.com/api/cart/${payload.id}`, {
        method: 'DELETE',
        headers: {
            'token' : payload.token
        }
    })
    const data = await res.json()
    if(res.ok) {
        toast.success(data.message, {
            position: 'top-center'
        })
    } else {
        toast.error(data.message, {position : 'top-center'})
    }
})

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    allCartData : [],
    loading: false
  },
  reducers: {
    deleteCartItem: (state, {payload}) => {
        const temp = [...state.allCartData].filter(item => item.cart_id  !== payload)
        state.allCartData = temp
    },
    resetCart: (state, {payload}) => {
        state.allCartData = []
        state.loading = false
    }
  },
  extraReducers: {
    [asyncCartGet.fulfilled] : (state, {payload}) => {
        state.allCartData = payload
        state.loading = false
    },
    [asyncCartAdd.pending] : (state, {payload}) => {
        state.loading = true
    },
    [asyncCartAdd.fulfilled] : (state, {payload}) => {
        state.allCartData = payload
        state.loading = false
    },
    [asyncCartGet.pending] : (state, {payload}) => {
        state.loading = true
    },
    [asyncCartEdit.fulfilled] : (state, {payload}) => {
        state.allCartData = payload
    }
  },
});

export const {deleteCartItem,resetCart} = cartSlice.actions;
export default cartSlice;
