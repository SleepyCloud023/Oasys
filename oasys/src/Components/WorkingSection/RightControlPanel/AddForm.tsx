/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { css, styled } from '@mui/material/styles';
import { BoxProps } from '@mui/system';
import { WorkStore } from '../WorkingSection';
import { ACTION } from '../types';

const StyledForm = styled((props: BoxProps) => (
  <Box component="form" noValidate autoComplete="off" {...props} />
))(
  ({ theme }) => css`
    background-color: ${theme.palette.primary.light};
    border-radius: 3px;
    /* & > :not(style) {
      margin: 1;
      width: 25ch;
    } */
  `,
);

const StyledTextField = styled((props: TextFieldProps) => (
  <TextField type={'text'} fullWidth size="small" {...props} />
))(
  ({ theme }) => css`
    font-size: 0.8rem;
    /* border-radius: 3px; */
  `,
);

type PropsAddForm = { title: string; activateForm: boolean };
function AddForm({ title, activateForm }: PropsAddForm) {
  const defaultUserInput = '';
  const [userInput, setUserinput] = React.useState(defaultUserInput);
  const notNullStore = React.useContext(WorkStore);
  if (notNullStore === null) return null;

  const [, workDispatch] = notNullStore;

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
  const onSubmit: React.FormEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setUserinput(defaultUserInput);
    workDispatch(action);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserinput(event.target.value);
  };

  return activateForm ? (
    <StyledForm onSubmit={onSubmit}>
      <StyledTextField
        name={`input-${lowercaseTitle}`}
        label={`type new ${lowercaseTitle}, press enter`}
        variant="filled"
        onChange={onChange}
        value={userInput}
      />
    </StyledForm>
  ) : null;
}

export default AddForm;
