import React from "react"
import API from "./API";
class LoginsField extends React.Component{
    constructor(props){
        super(props);
        this.onLoginEnter = this.onLoginEnter.bind(this);
    }
    
    onLoginEnter(){
        let loginTextMessage = document.getElementById("loginTextMessage");
        loginTextMessage.textContent = "";
        const timeoutFade = (text) => {
            loginTextMessage.style.color = "red";
            if(loginTextMessage.textContent !== "There's no such user"){
                loginTextMessage.textContent = text
            }
            setTimeout(() => {
                loginTextMessage.textContent="";
            }, 15000);
        }

        if(this.props.axios === undefined){
            timeoutFade("Please enter correct login and oauth key first")
        } else {
            this.props.axios.getUserRepos(this.props.onValue).catch((err) => {
                timeoutFade("There's no such user");
            })
            .then((responseParsed) => {
                if(responseParsed.login === ""){
                    timeoutFade("This user hasn't got any repositories or commits");
                } else if(responseParsed !== undefined){
                    return this.props.axios.getReposCommits(responseParsed)
                }  
            })
            .catch((err) => {
                timeoutFade("This user hasn't got any repositories or commits");
            })
            .then((histCommit) => {
                if(histCommit === undefined){
                    timeoutFade("This user hasn't got any repositories or commits");
                } else {
                    this.props.changeLoginsList(this.props.loginsList.concat({
                        [histCommit.login] : {
                            avatarUrl : histCommit.avatarUrl,
                            commits : histCommit.commits
                        }
                    }));
                }
            })
        }
    }
    
    render(){
        return (
        <div id="profilesListArea">
            <form className="submitForm">
                <input value={this.props.onValue} onChange={this.props.onChangingField} placeholder="Login to find commits" className="textForm submitFormCommon" type="text"></input>
                <button onClick={this.onLoginEnter} className="submitButton submitFormCommon" type='button'>Submit login</button>
                <div id="loginTextMessage" className="submitMessage submitFormCommon"></div>
            </form>
            <div>
                <ul>
                {
                this.props.loginsList.map((user) => {
                    let login = Object.keys(user)[0];
                    return (<li key={login} className="userBlock">
                        <img src={user[login].avatarUrl}></img>
                        <div>Username: {login}</div>
                        <div>Commits amount: {user[login].commits.length}</div>
                    </li>)
                }   
                )
                }
                </ul>
            </div>
        </div>
        )
    }
}


export default LoginsField;