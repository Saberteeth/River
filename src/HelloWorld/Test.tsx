import * as React from 'react';


interface Props {
  name: string,
  number?: number,
}

class Test extends React.Component<Props, Object> {
  render() {
    const { name } = this.props;
    return (
      <span>{`${name}`}</span>
    )
  }
}

export default Test;
