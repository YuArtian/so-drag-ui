/* export default class ReactCompiler {
  compoile(code: string) {
    const reactCode = `import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
     return (
       ${code}
     )
  }
}
ReactDOM.render(<App/>, document.getElementById('root'));`;
    return reactCode;
  }
} */
