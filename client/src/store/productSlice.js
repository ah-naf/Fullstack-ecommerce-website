import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const getProduct = createAsyncThunk('product/getProduct', async (payload, thunkAPI) => {
    let url= `https://ahnaf-ecommerce-website.herokuapp.com/api/products`
    if(payload.cat) {
        url = `https://ahnaf-ecommerce-website.herokuapp.com/api/products/?cat=${payload.cat}`
    }
    else if(payload.price.priceL) {
        url = `/api/products/?pricel=${payload.price.priceL}&&priceh=${payload.price.priceH}`
    }
    const res = await fetch(url);
    const data = await res.json()
    return data;
})


export const asyncFav = createAsyncThunk('product/asyncFav', async ({id, token}) => {
    const res = await fetch(`https://ahnaf-ecommerce-website.herokuapp.com/api/products/fav/${id}`, {
        method: 'POST',
        headers: {
            token: token
        }
    })
})

export const asyncFavGet = createAsyncThunk('product/asyncFavGet', async (token) => {
    const res = await fetch(`https://ahnaf-ecommerce-website.herokuapp.com/api/wishlist`, {
        headers: {
            token : token
        }
    })
    const data = await res.json()
    return data;
})

export const asyncSingleProduct = createAsyncThunk('product/asyncSingleProduct', async (id, thunkApi) => {
    const res = await fetch(`https://ahnaf-ecommerce-website.herokuapp.com/api/products/${id}`)
    const data = await res.json()
    return data;
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        allProduct: [],
        product: [],
        singleProduct: {},
        loading: false,
        allFavProduct: []
    },
    reducers: {
        sortProduct: (state, {payload}) => {
            if(payload === 'default') {
                state.product = state.allProduct
            } else if(payload === 'nameAsc') {
                state.product.sort((a,b) => {
                    if(a.name < b.name) {
                        return -1;
                    } else return 1;
                })
            } else if(payload === 'nameDesc') {
                state.product.sort((a,b) => {
                    if(a.name > b.name) {
                        return -1;
                    } else return 1;
                })
            } else if(payload === 'priceAsc') {
                state.product.sort((a,b) => {
                    if(a.price < b.price) {
                        return -1;
                    } else return 1;
                })
            } else if(payload === 'priceDesc') {
                state.product.sort((a,b) => {
                    if(a.price > b.price) {
                        return -1;
                    } else return 1;
                })
            }
        }
    },
    extraReducers: {
        [getProduct.pending]: (state, {payload}) => {
            state.loading = true
        },
        [getProduct.fulfilled]: (state, {payload}) => {
            state.allProduct = payload
            state.product = payload
            state.loading = false
        },
        [asyncSingleProduct.pending]: (state, action) => {
            state.loading = true
        },
        [asyncSingleProduct.fulfilled]: (state, {payload}) => {
            state.singleProduct = payload;
            state.loading = false
        },
        [asyncFavGet.pending]: (state, action) => {
            state.loading = true
        },
        [asyncFavGet.fulfilled]: (state, {payload}) => {
            state.allFavProduct = payload;
            state.loading = false
        },
        [getProduct.rejected]: (state, payload) => {
            state.loading = false
        },
        [asyncSingleProduct.rejected]: (state, payload) => {
            state.loading = false
        },
        [asyncFavGet.rejected]: (state, payload) => {
            state.loading = false
        }
    }
})

export const {sortProduct} = productSlice.actions
export default productSlice