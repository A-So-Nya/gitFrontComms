import React from "react";

class CommitsHistory extends React.Component{
    render(){
        return(
            <div id="commitsFeed">
                <ul>
                    {
                    this.props.loginsList.map((histEntry) => {
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