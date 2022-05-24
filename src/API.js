import Axios from "axios";
import { Buffer } from "buffer";
class API {

    constructor(loginOauth){
        this.axios = Axios.create(
        {
            headers:{
                "Accept" : "application/vnd.github.v3+json",
                "Authorization" : `Basic ${Buffer.from(loginOauth).toString('base64')}`,
            }
        })
    }

    async checkRateLimit(){
        return (
            this.axios.get("https://api.github.com/rate_limit")
                .then((response) => { return(response.data.rate.limit === 5000)})
        )
    }

    async getUserRepos(userName){
        return this.axios.get(`https://api.github.com/users/${userName}/repos`)
            .then((response) => {
                if(response.data.message === "Not Found"){
                    throw 404;
                } else {
                    return (this.parseReposResponse(response.data));
                }
            }
        )
    }

    async parseReposResponse(response){
        let responseParsed = {
            login: "",
            avatarUrl: "",
            repos: [],
        };
        try{
        responseParsed.login = response[0].owner.login;
        responseParsed.avatarUrl = response[0].owner.avatar_url;
        } catch{

        }
        response.forEach(responsePart => {
                    responseParsed.repos.push(responsePart.commits_url.split("{")[0])
        });
        return responseParsed;
    }

    async getReposCommits(responseParsed){
        let finalResponse = {
            login: responseParsed.login,
            avatarUrl: responseParsed.avatarUrl,
            commits: [],
        };
        responseParsed.repos.forEach((repoUrl) => {
            this.axios.get(repoUrl).then((response) => {
                response.data.forEach((commit) => {
                    finalResponse.commits.push(this.parseCommits(commit, responseParsed.login))
                })
                return finalResponse;
            })
        })
        return finalResponse;
    }

    parseCommits(response, login){
        return (response.commit.author.name === login ? null : ({
            "sha" : `${response.sha}`,
            "url" : `${response.html_url}`,
            "date" : `${response.commit.author.date}`,
            "message" : `${response.commit.message}`
        }))
    }
}

export default API;