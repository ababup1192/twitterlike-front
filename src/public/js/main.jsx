const HOST = "http://localhost:9393";

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
        const id = localStorage.getItem("id");

        this.reloadUnfollowers(id);
        this.reloadTimeline(id);
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
            const id = localStorage.getItem("id");

            this.reloadTimeline(id);
            // stateに反映。
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
                <p>name</p>
                <a href="/logout">Logout</a>
            </header>
            <UnfollowList list={ this.state.unfollowers } />
            <input
                value={this.state.tweetText}
                placeholder="ツイート"
                onChange={(e) => this.handleChange(e) }
                onKeyDown={(e) => this.handleKeyDown(e) }
                />
            <Timeline tweets={ this.state.tweets } />
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
}

ReactDOM.render(<App/>, document.getElementById("app"));
