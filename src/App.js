import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendPost, fetchPost, getPost } from './postSlice';


function App() {

  const dispatch = useDispatch()
    const [value, setValue] = useState("")
    const [titleValue, setTitleValue] = useState("")
    const  getPosts = useSelector(getPost)

  useEffect(()=>{
      dispatch(fetchPost())
  },[])

  return (
    <>
    <div className="top">
    <label htmlFor="title">
      Title: 
      <input 
        type="text"
        name='title'
        value={titleValue}
        onChange={(e)=>setTitleValue(e.target.value)} />
    </label>
    <label htmlFor="body">
      Body: 
    <input 
      type="text"
      name='body'
      value={value}
      onChange={(e)=>setValue(e.target.value)} />
    </label>
    <button
    onClick={()=>dispatch(sendPost({title:titleValue,body:value,userId:'1'}))}>submit</button>
  </div>
  <div className='post-wrapper'>
    {
      getPosts.map((post,index)=>(
        <div className='single-post' key={index}>
          <h4>{post.title}</h4>
          <h6>{post.body}</h6>
        </div>
      ))
    }
  </div>    
</>
  );
}

export default App;
