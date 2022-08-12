import { Component } from "react";
import LikeButton from "./LikeButton";

export default class CommentComp extends Component {
  state;
  constructor(props) {
    super(props);

    this.state = {
      likes: props.likes,
      liked: false,
      desLikes: props.desLikes,
      hited: false,
    };

    this.desLikeHandel = this.desLikeHandel.bind(this);
    this.likeHandel = this.likeHandel.bind(this);
  }

  // when like button click gonna be add 1 to likes
  likeHandel(){
    if (this.state.liked) {
      this.setState((s) => ({
        likes: s.likes - 1,
        liked: false,
      }));
      return;
    }
    this.setState((s) => ({
      likes: s.likes + 1,
      liked: true,
      desLikes: s.hited ? s.desLikes - 1 : s.desLikes,
      hited: false,
    }));
  }

  // desLikeButton clicked add 1 to desLikes
  desLikeHandel() {
    if (this.state.hited) {
      this.setState((s) => ({
        desLikes: s.desLikes - 1,
        hited: false,
      }));
      return;
    }
    this.setState((s) => ({
      likes: s.liked ? s.likes - 1 : s.likes,
      liked: false,
      desLikes: s.desLikes + 1,
      hited: true,
    }));
  }

  // render method
  render(){
    return (
      <div className="comment mt-3">
        <div className="comment-header py-2 px-3 bg-dark">
          {this.props.user}
        </div>
        <pre className="comment-content p-2">{this.props.content}</pre>
        <LikeButton
          onLikeClick={this.likeHandel}
          onDesLikeClick={this.desLikeHandel}
          state={this.state}
        />
      </div>
    );
  }
}
