import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


class Route extends React.Component {
  state = {
    who: true
  }

  onChange = () => {
    this.setState({ who: !this.state.who })
  }

  render() {
    return (
      <div>
        {
          this.state.who ?  <App /> : ' Canvas 已销毁 '
        }
      </div>
    )
  }
}


ReactDOM.render(
  <Route />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
