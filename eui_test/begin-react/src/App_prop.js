import React from 'react';
import Hello_prop from './Hello_prop';
import Button from '@material-ui/core/Button';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Wrapper from './Wrapper';

function App() {
  return (
    <>
      <AccessAlarmIcon/>
      <Button variant="contained" color="primary">Hello World</Button>
      <Wrapper>
        <Hello_prop name="정의령" color="red"/>
        <Hello_prop color="pink"/>
      </Wrapper>
    </>
  );
}

export default App;