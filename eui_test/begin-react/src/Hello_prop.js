import React from 'react';

function Hello_prop(props) {
  return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>
}

export default Hello_prop;