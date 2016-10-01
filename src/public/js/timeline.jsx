class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tweets = this.props.tweets.map((tweet) =>
            <li>{ tweet }</li>
        );
        return <ul>{ tweets }</ul>;
    }
}
