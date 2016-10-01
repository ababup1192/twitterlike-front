class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <header>
                <p>name</p>
                <a href="/logout">Logout</a>
            </header>
            <UnfollowList list={ Immutable.List.of("abc", "def", "ghi") } />
            <Timeline tweets={ Immutable.List.of("1111", "2222", "3333") } />
         </div>;
    }
}

ReactDOM.render(<App/>, document.getElementById("app"));