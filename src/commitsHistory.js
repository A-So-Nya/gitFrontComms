import React from "react";

class CommitsHistory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loginsList : this.props.loginsList.slice(0),
        };
    };
    
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.loginsList)
        this.setState((state) => ({
            loginsList: nextProps.loginsList.slice(0)
        }), () => {
            console.log(this.state)
            this.forceUpdate()
        }) 
      }

    render(){
        return(
            <div id="commitsFeed">
                <ul>
                    {
                    this.state.loginsList.slice(0).map((histEntry) => {
                        return (
                            Object.entries(histEntry).map((loginCommits) => {
                            return (
                                loginCommits[1].commits.map((commit) => {
                                return (<li key={commit.sha} className="commitArea">
                                    <img className="commitAvatar" src={loginCommits[1].avatarUrl}></img>
                                    <div className="commitsTop">{loginCommits[0]}</div><br></br>
                                    <div className="commitsBottom"><a href={commit.url}>{commit.message}</a> 
                                    {commit.date}</div> 
                                </li>);
                            }))
                        }))
                    })
                    }
                    </ul>
            </div>
        )
    }
};

export default CommitsHistory;