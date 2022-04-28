/** @jsxImportSource @emotion/react */
import { Button, css, Divider } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { DatasetInfo } from '../types/list-image';

export type ImageSetControllerProps = {
  id: number;
  data: DatasetInfo;
  setDataset: React.Dispatch<React.SetStateAction<DatasetInfo | null>>;
};

const annoExportUrl = '/api/annotation';
const imageUploadUrl = '/api/image/0';
const datasetUrl = '/api/dataset';

const buttonStyle = css`
  margin-left: 6px;
  background: teal;
  color: white;
`;

const dividerStyle = css`
  align-self: stretch;
  margin: 0.5rem 10px;
`;

const fileUploaderStyle = {
  cursor: 'pointer',
  position: 'absolute' as 'absolute',
  width: '100%',
  height: '100%',
};

const filePickerStyle = {
  position: 'absolute' as 'absolute',
  visibility: 'hidden' as 'hidden',
};

const annoExporterStyle = {
  position: 'absolute' as 'absolute',
  width: '100%',
  height: '100%',
};

function ImageSetController({ id, data, setDataset }: ImageSetControllerProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget.files;

    if (target != null) {
      uploadImage(target[0], target[0].name);
    }
  };

  const onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.currentTarget.value = '';
  };

  async function uploadImage(file: File | null, filename: string) {
    let config = {
      headers: {
        filepath: `${id}/${filename}`,
      },
    };

    const uploadRes = await axios.post(imageUploadUrl, file, config);
    const uploadSuccess = uploadRes.data.success;

    if (uploadSuccess) {
      const getDatasetRes = await axios.get(`${datasetUrl}/${id}`);
      const dataset = getDatasetRes.data;
      setDataset(dataset);
    }
  }

  const FileUploader = () => (
    <Button variant="contained" css={buttonStyle}>
      <label htmlFor="filePicker" style={fileUploaderStyle}></label>
      Image Upload
    </Button>
  );

  const FilePicker = () => (
    <input
      id="filePicker"
      style={filePickerStyle}
      type={'file'}
      onChange={onChange}
      onClick={onClick}
    ></input>
  );

  const AnnoExportLink = () => (
    <Button variant="contained" css={buttonStyle}>
      <a href={`${annoExportUrl}/${id}`} style={annoExporterStyle} download></a>
      Export Anno
    </Button>
  );

  return (
    <>
      <h2>ImageSetController</h2>
      <FileUploader />
      <FilePicker />
      <AnnoExportLink />
      <Divider css={dividerStyle} />
    </>
  );
}

export default ImageSetController;
