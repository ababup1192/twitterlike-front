class UnfollowList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const list = this.props.list.map((user) =>
            <li>
                <p>{ user.name }</p>
                 <input
                    value="follow"
                    type="button"
                    onClick={(e) => this.props.postFollow(this.props.userId, user.id) }
                    />
            </li>
        );
        return <ul className="unfollow-list">{ list }</ul>;
    }
}
