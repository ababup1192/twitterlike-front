class UnfollowList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const list = this.props.list.map((user) =>
            <li className="unfollow-list-item">
                <p>{ user.name }
                    <input
                        value="follow"
                        type="button"
                        onClick={(e) => this.props.postFollow(this.props.userId, user.id) }
                        />
                </p>
            </li>
        );
        return <ul className="unfollow-list">{ list }</ul>;
    }
}
