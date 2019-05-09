class Bar extends React.Component {
    render() {
      return (
        <div className="Bar">
          <input type="text" name={this.props.value} placeholder={this.props.value}></input>
        </div>
      );
    }
  }
  
  class Button extends React.Component {
    render() {
      return (
        <div className="button">
          <input type="submit" name="submitButton" value={this.props.value.toLowerCase()}></input>
        </div>
      );
    }
  }
  
  class Login extends React.Component {
    renderBar(purpose) {
      return <Bar value={purpose} />;
    }
    
    renderButton(purpose) {
      return <Button value={purpose} />;
    }
    
    render() {
      return (
        <form action="/frontAuth" method='post'>
            <div className="loginBox">
                <div className="login">{this.renderButton("Login")}</div> 
                <div className="barContainer">
                    <div className="userBar">{this.renderBar("Username")}</div>
                    <div className="passBar">{this.renderBar("Password")}</div>
                </div>
                <div className="register">{this.renderButton("Register")}</div>
            </div>
        </form>
      );
    }
  }
  
  ReactDOM.render(<Login />, document.getElementById('root'))
  
  // class Login extends React.Component {
  //   renderBar(purpose) {
  //     return <input type="text" name=purpose placeholder=purpose />;
  //   }
  // }