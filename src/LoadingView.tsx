import * as React from 'react';
import * as Loading from './HelloWorld/Loading';

export default class LoadingView extends React.Component {
  loading: Loading.Loading;
  public componentDidMount() {
    if(!this.loading) {
      this.loading = Loading.createActivity('loading');
      this.loading.onCreate();
    }
  }

  componentWillUnmount() {
    this.loading && this.loading.destory();
  }

  render() {
    return (<div className="loading">
      <canvas className="load" width="50" height="50" id="loading" />
    </div>)
  }
}
