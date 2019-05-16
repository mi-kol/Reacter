class TextArea extends React.Component {
    render() {
        return (
            <input type="text" name="textinput" placeholder="What are you thinking about"></input>
        );
    }
}

class Button extends React.Component {
    render() {
        return (
            <input type="submit" name="submitButton" value="Submit"></input>
        )
    }
}

class NewPostBox extends React.Component {
    renderTextArea() {
        return <TextArea />;
    }

    renderButton() {
        return <Button />;
    }

    render() {
        return (
            <form action="/addpost" method='post'>
                <div className="newPostBox">
                    <div className="textbox">{this.renderTextArea()}</div>
                    <div className="submitpost">{this.renderButton()}</div>
                </div>
            </form>
        );
    }
}

ReactDOM.render(<NewPostBox />, document.getElementById('addPost'))