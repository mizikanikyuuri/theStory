import React from 'react';
import './ChatOutput.css';

type ChatOutputProps = {
    className?: string,
    chat?: Array<string>,
}

class ChatOutput extends React.Component<ChatOutputProps,{}>{
    #scrollRef
    constructor(props) {
      super(props);
      this.#scrollRef = React.createRef();
    }
    static defaultProps = {
        className : "",
        chat:[" message is not sent yet"]
    }
    componentDidUpdate(){
        this.#scrollRef.current.scrollIntoView(false);
    }
    render() {
        const messageList=this.props.chat.map(message=><li>{message}</li>);
        
        return (
            <div className={"chat-output "+this.props.className} >
                <ul ref={this.#scrollRef}>{messageList}</ul>
            </div>
        );
    }
  }
export { ChatOutputProps, ChatOutput }