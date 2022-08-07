import { Component } from "react";
import CommentComp, { Comment } from "./Comment";
import LikeButton from "./LikeButton";
import { Form, InputGroup, Button } from "react-bootstrap";
import { ArrowUp, ArrowDown } from "react-bootstrap-icons";

type Post = {
  name: string;
  content: string;
  likes: number;
  desLikes: number;
  comments: Array<Comment>;
};

export default class PostComp extends Component {
  constructor(props: Post) {
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

  commentSender(): void {
    if (this.state.commentContent == "") return;
    const name = prompt("your name: ");
    const comment: Comment = {
      user: name,
      content: this.state.commentContent,
      likes: 0,
      desLikes: 0,
    };
    this.setState((s: Object) => {
      s.comments.push(comment);
      return {
        commentContent: "",
        comments: s.comments,
      };
    });
  }
  commentContentChangeHandel(e): void {
    this.setState({
      commentContent: e.target.value,
    });
  }

  render(): any {
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
          {this.state.comments.map((i: Comment) => {
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
