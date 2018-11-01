import * as React from 'react';
import './App.css';
import { createActivity, MainActivity } from './HelloWorld/Main';
import Title from './HelloWorld/Title';

var moment = require('moment');

class App extends React.Component {
  main: MainActivity | null = null;

  componentWillUnmount() {
    this.main && this.main.destory();
  }

  state = {
    time: moment().format("a h:mm").replace('am','上午').replace('pm','下午'),
    isUserListShow: false,
    isRemove: true,
    users: [{
      name: 'Harry Potter',
      phoneNunber: '13141426881',
    },
    {
      name: 'Arthas',
      phoneNunber: '13141426882',
    }]
  }

  userItemClose() {
    this.setState({ isUserListShow: false });
    setTimeout(()=>{
      this.setState({ isRemove: true });
    },500);
  }

  userItemOpen() {
    this.setState({ isRemove: false });
    setTimeout(()=>{
      this.setState({ isUserListShow: true });
    },0)
  }

  public render() {
    return (
      <div className="App">
        <Title name="Hello World" />
        <div className="iphone">
          <div className="head">
          <div style={{float: 'left'}}>中国移动</div>
          <div style={{float: 'right'}}>
            {moment().format("a h:mm").replace('am','上午').replace('pm','下午')}
          </div>
          </div>
          <canvas width="400" height="600" id="helloworld" />
          <User isRemove={this.state.isRemove} isShow={this.state.isUserListShow} users={this.state.users} onClick={()=>{ this.userItemClose() }}/>
        </div>
        <div className="list">
          <h2>DEMO</h2>
          <List />
          <div style={{ textAlign: 'left', paddingLeft: '20px', paddingBottom: '20px' }}>
            当前是通过 River 简单模拟 iPhone 操作界面的案例。Gomoku 则是一个 River 实现并已打包后的五子棋案例。
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    if (!this.main) {
      this.main = createActivity('helloworld');
      this.main.react = this;
      this.main.addTimer(dt => {
        const newTime = moment().format("a h:mm").replace('am','上午').replace('pm','下午');
        this.state.time !== newTime && this.setState({ time: newTime });
      });
      this.main.onCreate();
    }
  }
}

function User({ onClick, users = [], isShow, isRemove }: any) {

  return (
    <div className={`user ${isShow ? '': 'hide'} ${isRemove ? 'remove' : ''}`}>
      {users.map((element:any, key: number) => (<div className="item" key={key}>
        <b>{element.name} </b><div style={{ float: 'right' }}>{element.phoneNunber}</div>
      </div>))}
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
