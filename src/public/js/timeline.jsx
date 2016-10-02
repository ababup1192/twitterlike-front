class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tweets = this.props.tweets.reverse().map((tweet) =>
            <li>{ `${tweet.name}: ${tweet.text}` }</li>
        );
        return <ul className="timeline">{ tweets }</ul>;
    }
}
