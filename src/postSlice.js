import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const GET_POST_URL= "https://jsonplaceholder.typicode.com/posts";



export const fetchPost = createAsyncThunk(
    'posts/fetchPosts', 
    async () =>{
        const response = await fetch(GET_POST_URL);
        const data = await response.json();
        return data;
    }
)

export const sendPost = createAsyncThunk('posts/sendPosts',async(obj)=>{
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
  })
  

const initialState={
    post:[],
    error:"", 
    loading:false
}


const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(fetchPost.pending, (state)=>{
            state.loading =true;
        }).addCase(fetchPost.fulfilled, (state, action)=>{
            state.loading=false
            state.post = action.payload
        }).addCase(fetchPost.rejected, (state,action)=>{
            state.loading=false
            state.error = action.error.message
        })
    }
})

export default postSlice.reducer
export const getPost = state => state.post.post;