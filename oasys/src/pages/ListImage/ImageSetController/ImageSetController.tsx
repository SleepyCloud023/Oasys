/** @jsxImportSource @emotion/react */
import { Button, css, Divider } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { DatasetInfo } from '../types/list-image';
import styled from 'styled-components';

export type ImageSetControllerProps = {
  id: number;
  data: DatasetInfo;
  setDataset: React.Dispatch<React.SetStateAction<DatasetInfo | null>>;
};

const fileUploaderStyle = {
  marginLeft: '4px',
  cursor: 'pointer',
  color: 'white',
  background: 'teal',
  padding: '.375rem .75rem',
  border: '1px solid teal',
  borderRadius: '.25rem',
  fontSize: '1rem',
  lineHeight: 1.5,
};

const dividerStyle = css`
  align-self: stretch;
  margin: 0.5rem 10px;
`;

function ImageSetController({ id, data, setDataset }: ImageSetControllerProps) {
  async function newBook(file: File | null, filename: string) {
    let config = {
      headers: {
        filepath: `${id}/${filename}`,
      },
    };

    const iu_res = await axios.post('/api/image', file, config);

    if (iu_res.data.success) {
      const get_data_res = await axios.get(`/api/dataset/${id}`);
      setDataset(get_data_res.data);
    }
  }

  return (
    <>
      <h2>ImageSetController</h2>
      <label htmlFor="filePicker" style={fileUploaderStyle}>
        Image Upload
      </label>
      <input
        id="filePicker"
        style={{ visibility: 'hidden' }}
        type={'file'}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const target = e.currentTarget.files;
          if (target != null) {
            newBook(target[0], target[0].name);
          }
        }}
        onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
          e.currentTarget.value = '';
        }}
      ></input>
      <Divider css={dividerStyle} />
    </>
  );
}

export default ImageSetController;
