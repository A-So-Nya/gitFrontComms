import API from "./API"
import React from 'react'


class LoginOauthField extends React.Component{
    constructor(props){
        super(props);
        this.handleLoginEnter = this.handleLoginEnter.bind(this);
    }
    handleLoginEnter(){
        let tryAxObj = new API(this.props.onValue)
        tryAxObj.checkRateLimit().then((result) => {
            let message = document.getElementById("errorTextLogin");
            if(result){
                this.props.axChanger(tryAxObj);
                message.textContent = "Authorization was successful";
                message.style.color = "green";
                document.getElementById("enterLoginOauth").style = {"border" : "none"};
                setTimeout(() => {
                    message.textContent = '';
                }, 30000);
            } else {
                document.getElementById("enterLoginOauth").style = {"border" : "3px solid red"};
                message.textContent = "Login or Password are incorrect";
                message.style.color = "red";
            }
        })
      }
    render() {
        return (
            <form id="loginField" className="submitForm">
                <input className="textForm submitFormCommon" id="enterLoginOauth" type="text" placeholder="Login:Oauth" value={this.props.onValue} onChange={this.props.onChangingField}></input>
                <button className="submitButton submitFormCommon" type='button' id="submitLoginOauth" onClick={this.handleLoginEnter}>Submit</button>
                <div className="submitMessage submitFormCommon" id="errorTextLogin"></div>
            </form>
        )
    }
}

export default LoginOauthField;