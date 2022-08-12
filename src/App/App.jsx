import { useState } from 'react'
import { Button } from 'react-bootstrap'
import Post from "../comp/PostHeader"
import posts from "../posts/post.json"
import "./App.css"

function App() {
  return (
    <div className="App">
      {
        posts.map(post => {
          return <Post
            name={post.name}
            likes={post.likes}
            desLikes={post.desLikes}
            content={post.content}
            comments={post.comments}/>
        })
      }
    </div>
  )
}

export default App
