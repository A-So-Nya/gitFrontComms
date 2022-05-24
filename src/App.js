import React from 'react'
import LoginOauthField from './LoginOauthField'
import './index.css'
import LoginsField from './loginField';
import CommitsHistory from './commitsHistory';
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      enteredLogins : [],
      loginOuath : "",
      login: "",
      axiosInstance : undefined,
    }

    this.handleLoginOauth = this.handleLoginOauth.bind(this)
    this.changeAxiosObject = this.changeAxiosObject.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.changeLoginsList = this.changeLoginsList.bind(this)
    this.i=1;
  }
  componentDidMount(){
    /*
    API.getUserRepos("A-So-Nya")
    .then((responseParsed) => {return API.getReposCommits(responseParsed)})
    .then((hist) => {console.log(hist)})
    */
  }

  handleLoginOauth(event){
    this.setState({loginOuath: event.target.value})
  }
  
  changeAxiosObject(AxObj){
    this.setState({axiosInstance : AxObj})
  }

  handleLogin(event){
    this.setState({login: event.target.value})
  }

  changeLoginsList(list){
    this.setState((state) => ({enteredLogins: list}), () => {
      this.i=this.i+1;
    });
  }

  render(){
    
    return (
      <div id="container">
        <LoginOauthField axChanger={this.changeAxiosObject} onChangingField={this.handleLoginOauth} onValue={this.state.loginOuath}></LoginOauthField>
        <LoginsField changeLoginsList={this.changeLoginsList} loginsList={this.state.enteredLogins} onValue={this.state.login} onChangingField={this.handleLogin} axios={this.state.axiosInstance} ></LoginsField>
        <CommitsHistory i={this.i} loginsList={this.state.enteredLogins}></CommitsHistory>
      </div>
    )
  }
}
export default App;
