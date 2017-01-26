const HOST = "https://twitterlike-api.au-syd.mybluemix.net";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unfollowers: Immutable.List(),
            tweetText: "",
            tweets: Immutable.List()
        };
    }

    componentDidMount() {
        this.reloadUnfollowers(this.props.userId);
        this.reloadTimeline(this.props.userId);

        setInterval(() =>
            this.reloadUnfollowers(this.props.userId)
            , 1000);
        setInterval(() =>
            this.reloadTimeline(this.props.userId)
            , 1000);
    }

    // inputの内容が変わったら、textに内容を反映。
    handleChange(e) {
        var textValue = e.target.value;
        this.setState({ unfollowers: this.state.unfollowers, tweetText: textValue });
    }

    // keyが押されたとき。
    handleKeyDown(e) {
        // エンターキーが押され、かつ内容が空じゃなかったときの処理
        if (e.keyCode === 13 && this.state.tweetText !== "") {
            this.postTweet(id, this.state.tweetText);
            this.setState({
                unfollowers: this.state.unfollowers,
                tweetText: "",
                tweets: this.state.tweets
            });
        }
    }

    render() {
        return <div>
            <header>
                <a href="/logout">
                    { this.props.name } &nbsp;
                    <span>Logout</span>
                </a>
            </header>
            <div className="contents">
                <UnfollowList
                    list={ this.state.unfollowers }
                    userId={ this.props.userId}
                    postFollow={ this.postFollow.bind(this) }
                    />
                <div className="contents-main">
                    <input
                        className="tweet-form"
                        value={this.state.tweetText}
                        placeholder="ツイート"
                        onChange={(e) => this.handleChange(e) }
                        onKeyDown={(e) => this.handleKeyDown(e) }
                        />
                    <Timeline tweets={ this.state.tweets } />
                </div>
            </div>
        </div>;
    }

    reloadUnfollowers(id) {
        fetch(`${HOST}/users/${id}/unfollow`, {
            method: "get"
        }).then((response) =>
            response.json()
            ).then((json) =>
                this.setState({
                    unfollowers: Immutable.List(json),
                    tweetText: this.state.tweetText,
                    tweets: this.state.tweets
                })
            ).catch(function (response) {
                console.error(response);
            });
    }

    reloadTimeline(id) {
        fetch(`${HOST}/tweets/timeline/${id}`, {
            method: "get"
        }).then((response) =>
            response.json()
            ).then((json) =>
                this.setState({
                    unfollowers: this.state.unfollowers,
                    tweetText: this.state.tweetText,
                    tweets: Immutable.List(json)
                })
            ).catch(function (response) {
                console.error(response);
            });
    }

    postTweet(userId, text) {
        const json = JSON.stringify({ user_id: userId, text: text });
        fetch(`${HOST}/tweets`, {
            method: 'POST',
            body: json
        }).then((response) =>
            response.json()
            ).then((json) => {
                this.reloadTimeline(userId);
                console.log(json);
            }).catch((error) =>
                console.error(error)
            );
    }

    postFollow(userId, followId) {
        const json = JSON.stringify({ user_id: userId, follow_id: followId });
        fetch(`${HOST}/follows`, {
            method: 'POST',
            body: json
        }).then((response) =>
            response.json()
            ).then((json) => {
                this.reloadUnfollowers(userId);
                this.reloadTimeline(userId);
                console.log(json);
            }).catch((error) =>
                console.error(error)
            );
    }
}

const id = Number(localStorage.getItem("id"));
const token = localStorage.getItem("token");
const name = localStorage.getItem("name");
ReactDOM.render(<App userId={id} token={token} name={name}/>, document.getElementById("app"));
