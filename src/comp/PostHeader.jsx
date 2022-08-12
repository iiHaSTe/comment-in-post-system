import { Component } from "react";
import CommentComp from "./Comment";
import LikeButton from "./LikeButton";
import { Form, InputGroup, Button } from "react-bootstrap";
import { ArrowUp, ArrowDown } from "react-bootstrap-icons";

export default class PostComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: props.likes,
      liked: false,
      desLikes: props.desLikes,
      hited: false,
      comments: props.comments,
      commentContent: "",
    };

    this.desLikeHandel = this.desLikeHandel.bind(this);
    this.likeHandel = this.likeHandel.bind(this);
    this.commentSender = this.commentSender.bind(this);
    this.commentContentChangeHandel =
      this.commentContentChangeHandel.bind(this);
  }

  likeHandel() {
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

  commentSender() {
    if (this.state.commentContent == "") return;
    const name = prompt("your name: ");
    const comment = {
      user: name,
      content: this.state.commentContent,
      likes: 0,
      desLikes: 0,
    };
    this.setState((s) => {
      s.comments.push(comment);
      return {
        commentContent: "",
        comments: s.comments,
      };
    });
  }
  commentContentChangeHandel(e) {
    this.setState({
      commentContent: e.target.value,
    });
  }

  render() {
    return (
      <div className="container">
        <div>
          <p className="mt-3 p-2 bg-light h5">{this.props.name || ""}</p>

          <pre className="container">
            {this.props.content || (
              <span class="text-muted">no descreption found...</span>
            )}
          </pre>

          <LikeButton
            onLikeClick={this.likeHandel}
            onDesLikeClick={this.desLikeHandel}
            state={this.state}
          />
        </div>

        {/* input to apply new comment */}
        <InputGroup className="my-3">
          <Form.Control
            placeholder="Comment ..."
            aria-describedby="send"
            onChange={this.commentContentChangeHandel}
            value={this.state.commentContent}
          />
          <Button
            onClick={this.commentSender}
            variant="outline-primary"
            id="send"
          >
            send
          </Button>
        </InputGroup>

        <div className="container mt-5">
          {/* loop on all comments and show them */}
          {this.state.comments.map((i) => {
            return (
              <CommentComp
                user={i.user}
                content={i.content}
                likes={i.likes}
                desLikes={i.desLikes}
                replys={i.replys}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
