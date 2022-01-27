import React from 'react';

function Hello_prop(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>
}

Hello_prop.defaultProps = {
  name: '이름없음'
}

export default Hello_prop;