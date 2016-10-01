class UnfollowList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const list = this.props.list.map((user) =>
            <li>{ user }</li>
        );
        return <ul>{ list }</ul>;
    }
}
