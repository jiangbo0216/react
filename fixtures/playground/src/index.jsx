import * as React from "react";
import * as ReactDom from "react-dom";

global.__DEV__ = true

const App = () => {
    return <div>hello-world</div>
}

ReactDom.render(<App/>, document.getElementById('app'))
