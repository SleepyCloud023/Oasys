/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { css, styled } from '@mui/material/styles';
import { BoxProps } from '@mui/system';
import { WorkStore } from '../WorkingSection';
import { ACTION } from '../types';
import { darken } from 'polished';
import { useWorkStore } from '../utils';

const StyledForm = styled((props: BoxProps) => (
  <Box component="form" noValidate autoComplete="off" {...props} />
))(
  ({ theme }) => css`
    background-color: ${theme.palette.background.paper};
    color: black;
    border-radius: 3px;
    /* padding: 6px 0; */
    z-index: 0;
    display: flex;
    align-items: center;
    /* & > :not(style) {
      margin: 1;
      width: 25ch;
    } */
    &:focus {
      /* background-color: ${darken(0.2, theme.palette.background.paper)}; */
      background-color: ${darken(0.2, theme.palette.background.paper)};
    }
  `,
);

const StyledTextField = styled((props: TextFieldProps) => (
  <TextField
    autoFocus
    variant="outlined"
    type={'text'}
    fullWidth
    size="small"
    {...props}
  />
))(
  ({ theme }) => css`
    font-size: 0.8rem;
    & :focus {
      background-color: ${darken(0.1, theme.palette.background.paper)};
    }
    /* border-radius: 3px; */
  `,
);

type PropsAddForm = { title: string };

// TODO: 리팩토링
// 특히 사용자 입력 폼을 재사용한 컴포넌트로 전환
function AddForm({ title }: PropsAddForm) {
  const defaultUserInput = '';
  const [userInput, setUserinput] = React.useState(defaultUserInput);
  const [, workDispatch] = useWorkStore();

  const lowercaseTitle = title.toLowerCase();
  // TODO: variable key name 사용 가능한 지? ENUM type도 알아보기
  const action: ACTION =
    lowercaseTitle === 'tag'
      ? {
          type: 'ADD_TAG',
          newTag: userInput,
        }
      : {
          type: 'ADD_CATEGORY',
          newCategory: userInput,
        };

  const addCategory: React.FormEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setUserinput(defaultUserInput);
    workDispatch(action);
  };

  const updateState: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserinput(event.target.value);
  };

  const preventBubbling: React.KeyboardEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <StyledForm onSubmit={addCategory}>
      <StyledTextField
        name={`input-${lowercaseTitle}`}
        placeholder={`type new ${lowercaseTitle}, press enter`}
        // label={`type new ${lowercaseTitle}, press enter`}
        value={userInput}
        onChange={updateState}
        onKeyDown={preventBubbling}
      />
    </StyledForm>
  );
}

export default AddForm;
