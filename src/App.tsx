import * as React from 'react';
import './App.css';
import { createActivity, MainActivity } from './HelloWorld/Main';
import Title from './HelloWorld/Title';
import LoadingView from './LoadingView';
import icon from './demo.svg';
import logo from './logo.png';

const moment = require('moment');

class App extends React.Component {
  main: MainActivity | null = null;

  componentWillUnmount() {
    this.main && this.main.destory();
  }

  state = {
    time: moment().format("a h:mm").replace('am', '上午').replace('pm', '下午'),
    isUserListShow: false,
    isRemove: true,
    type: 1,
    loading: true,
    users: [{
      name: 'Harry Potter',
      phoneNumber: '13141426881',
    },
    {
      name: 'Arthas',
      phoneNumber: '13141426882',
    }]
  }

  userItemClose() {
    this.setState({ isUserListShow: false });
    setTimeout(() => {
      this.setState({ isRemove: true });
    }, 500);
  }

  userItemOpen(type: number) {
    this.setState({ isRemove: false });
    setTimeout(() => {
      this.setState({ isUserListShow: true, type });
    }, 0)
  }

  public render() {
    return (
      <div className="App">
        <Title name="Hello World" />
        <img style={{ position: 'fixed', top: '400px', left: '60px' }} src={icon} width="400" />
        <div style={{ background: 'white', position: 'fixed', width: '400px', right: '10px', top: '100px', padding: '10px', textAlign: 'left' }}>
          <h2>Introduction</h2>
          <div>
            <span className="firstword">T</span>here are some ensstial concepts in River. The all views is based on the class <b>View</b>. It tell the view how to render itself and bind the action. If u want have some parent abilities that u can implements <b>iContainer</b>, just like class <b>Activity</b> and <b>Container</b>.
          </div>
          <br />
          <div>
          <span className="firstword">F</span>inally if u want have some animation that can extends class <b>Animation</b> and implements abstract function <b>run</b>, just like class <b>Circle</b> in Loading's demo.
          </div>
        </div>
        <div className="iphone">
          <div className="head">
            <div style={{ float: 'left' }}>中国移动</div>
            <div style={{ float: 'right' }}>
              {moment().format("a h:mm").replace('am', '上午').replace('pm', '下午')}
            </div>
          </div>
          <canvas width="400" height="600" id="helloworld" />
          <User type={this.state.type} onAddUser={(e: any) => {
            const { value: name }: any = document.getElementById('name');
            const { value: phoneNumber }: any = document.getElementById('phoneNumber');
            if (!name || !phoneNumber) {
              console.log('错误的号码或用户名');
              return;
            }
            this.loadEnd();
            this.setState({
              loading: true,
              users: [{
                name,
                phoneNumber
              },
              ...this.state.users
              ]
            });

          }} isRemove={this.state.isRemove} isShow={this.state.isUserListShow} users={this.state.users} onClick={() => { this.userItemClose() }} />
          {this.state.loading ? <LoadingView /> : null}
        </div>
        <div className="list">
          <h2> <img style={{ float: 'left', marginTop: '-28.5px' }} src={logo} height={90} /> DEMO</h2>
          <List />
          <div style={{ textAlign: 'left', paddingLeft: '20px', paddingBottom: '20px' }}>
            <span className="firstword">T</span>his demo is a fake iPhone's desktop and there have a Gomoku is created by <b>River</b> too.
          </div>
        </div>
      </div>
    );
  }

  public loadEnd() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 5000);
  }

  public componentDidMount() {
    this.loadEnd();
    if (!this.main) {
      this.main = createActivity('helloworld');
      this.main.react = this;
      this.main.addTimer(dt => {
        const newTime = moment().format("a h:mm").replace('am', '上午').replace('pm', '下午');
        this.state.time !== newTime && this.setState({ time: newTime });
      });
      this.main.onCreate();
    }
  }
}

function User({ onClick, users = [], isShow, isRemove, onAddUser, type = 1 }: any) {

  return (
    <div className={`user ${isShow ? '' : 'hide'} ${isRemove ? 'remove' : ''}`}>
      {
        type === 1 ? <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          姓名：<input id="name" type="text" /> 电话号：<input id="phoneNumber" type="text" />
        </div> : null
      }
      <div style={{ height: '475px', overflow: 'scroll' }}>
        {users.map((element: any, key: number) => (<div className="item" key={key}>
          <b>{element.name} </b><div style={{ float: 'right' }}>{element.phoneNumber}</div>
        </div>))}
      </div>
      {type === 1 ? <div className="button" onClick={onAddUser} style={{ bottom: '42px', background: 'rgb(75, 95, 194)' }}>添 加</div> : null}
      <div className="button" onClick={onClick}>确 认</div>
    </div>
  )
}

function List() {
  return (<ul>
    <li><b><a href="game/index.html">Gomoku</a></b></li>
  </ul>)
}

export default App;
