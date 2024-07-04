export class GithubApi{

    static search(username){
        const endpoint = `https://api.github.com/users/${username}`

        const user = fetch(endpoint).then(data => data.json()).then(({login, name, public_repos, followers}) => ({
            login,
            name,
            public_repos,
            followers
        }))

        return user;
    }
}