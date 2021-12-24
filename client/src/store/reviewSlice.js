import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

toast.configure();

export const asyncReviewAdd = createAsyncThunk('review/asyncReviewAdd', async (payload) => {
    const res = await fetch(`https://ahnaf-ecommerce-website.herokuapp.com/api/reviews/${payload.id}`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'token' : payload.token
        },
        body: JSON.stringify({
            title : payload.title,
            desc : payload.desc,
            rating : payload.rating
        })
    })
    const data = await res.json()
    if(!res.ok) {
        toast.error(data.message, {
            position: 'top-center'
        })
    } else {
        toast.success('Thanks for the review', {
            position: 'top-center'
        })
    }
})

export const asynctGetReview = createAsyncThunk('review/asyncGetReview', async (id) => {
    const res = await fetch(`https://ahnaf-ecommerce-website.herokuapp.com/api/reviews/${id}`)
    const data = await res.json()
    if(res.ok) {
        return data;
    }
})



const reviewSlice = createSlice({
  name: "review",
  initialState: {
      review : []
  },
  reducers: {
    
  },
  extraReducers: {
    [asynctGetReview.fulfilled] : (state, {payload}) => {
        state.review = payload
    }
  },
});

export const {} = reviewSlice.actions;
export default reviewSlice;

