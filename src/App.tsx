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
        <img style={{ position: 'fixed', top: '400px', left: '60px' }} src={icon} width="400"/>
        <div style={{ background: 'white',position: 'fixed', width: '400px', right: '10px', top: '100px', padding: '10px', textAlign: 'left' }}>
          <h2>概念</h2>
          <div>
          所有视图的基类都是基于 View，View 核心功能在于实现 Action 的触发和渲染的自我管理。而如果实现了接口 iContainer 的 View 同时也具有了添加子对象和对子对象渲染管理的功能。
          <div>事实上 River 直接提供的 Container 容器对象正是实现了 iContainer 的 View。同时顶层的终极管理对象 Activity 也是 iContainer 的实现。
          而 Loading 也正是由一个 iContainer 管理者多个 View 并通过调用实现 Animation 抽象类的 Arc 动画类来完成整套动画的展现。为了完成各种定制化需求，View 可以通过对 onDraw 的实现自我渲染，并最终得到 Loading 时颜色渐变跟随的效果。
          </div>
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
            if (!name || !phoneNumber ) {
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
          <h2> <img style={{ float: 'left', marginTop: '-30px' }} src={logo} height={90}/> DEMO</h2>
          <List />
          <div style={{ textAlign: 'left', paddingLeft: '20px', paddingBottom: '20px' }}>
            当前是通过 River 简单模拟 iPhone 操作界面的案例。Gomoku 则是一个 River 实现并已打包后的五子棋案例。
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
