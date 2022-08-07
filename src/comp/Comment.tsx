import { Component } from "react"
import LikeButton from "./LikeButton";


type Comment = {
  user: string;
  content: string;
  likes: number;
  desLikes: number;
}

export default class CommentComp extends Component {
  constructor(props: Comment){
    super(props)
    
    this.state = {
      likes: props.likes,
      liked: false,
      desLikes: props.desLikes,
      hited: false,
    }
    
    this.desLikeHandel = this.desLikeHandel.bind(this);
    this.likeHandel = this.likeHandel.bind(this);
  }
  
  // when like button click gonna be add 1 to likes
  likeHandel(): void {
    if (this.state.liked) {
      this.setState((s: Object) => ({
        likes: s.likes - 1,
        liked: false,
      }));
      return;
    }
    this.setState((s: Object) => ({
      likes: s.likes + 1,
      liked: true,
      desLikes: s.hited ? s.desLikes - 1 : s.desLikes,
      hited: false,
    }));
  }
  
  // desLikeButton clicked add 1 to desLikes
  desLikeHandel(): void {
    if (this.state.hited) {
      this.setState((s: Object) => ({
        desLikes: s.desLikes - 1,
        hited: false,
      }));
      return;
    }
    this.setState((s: Object) => ({
      likes: s.liked ? s.likes - 1 : s.likes,
      liked: false,
      desLikes: s.desLikes + 1,
      hited: true,
    }));
  }
  
  // render method
  render(): any{
    return (
      <div className="comment mt-3">
        <div className="comment-header py-2 px-3 bg-dark">{this.props.user}</div>
        <pre className="comment-content p-2">
          {this.props.content}
        </pre>
        <LikeButton
          onLikeClick={this.likeHandel}
          onDesLikeClick={this.desLikeHandel}
          state={this.state}/>
      </div>
    )
  }
}