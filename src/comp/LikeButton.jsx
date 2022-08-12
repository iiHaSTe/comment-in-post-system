import { Component } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { ArrowUp, ArrowDown } from "react-bootstrap-icons";


export default class LikeButton extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="mt-2 mb-3 mx-4">
        <Button
          onClick={this.props.onLikeClick}
          variant={this.props.state.liked ? "primary" : "light"}
        >
          <ArrowUp /> <span class="ml-4">{this.props.state.likes}</span>
        </Button>
        <Button
          onClick={this.props.onDesLikeClick}
          variant={this.props.state.hited ? "danger" : "light"}
          style={{ marginLeft: "18px" }}
        >
          <ArrowDown /> <span class="ml-4">{this.props.state.desLikes}</span>
        </Button>
      </div>
    );
  }
}
