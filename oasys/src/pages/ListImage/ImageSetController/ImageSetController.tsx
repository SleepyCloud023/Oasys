/** @jsxImportSource @emotion/react */
import { Button, css, Divider } from '@mui/material';
import axios from 'axios';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { DatasetInfo } from '../types/list-image';
import { DirectoryPicker, FilePicker } from './picker';

export type ImageSetControllerProps = {
  id: number;
  data: DatasetInfo;
  setDataset: React.Dispatch<React.SetStateAction<DatasetInfo | null>>;
};

const annoExportUrl = '/api/annotation';
const imageUploadUrl = '/api/image';
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

const annoExporterStyle = {
  position: 'absolute' as 'absolute',
  width: '100%',
  height: '100%',
};

function ImageSetController({ id, data, setDataset }: ImageSetControllerProps) {
  const onPickerChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;

    if (target.files != null && target.id == 'filePicker') {
      uploadImage(target.files);
    } else if (target.files != null && target.id == 'directoryPicker') {
      uploadDirectory(target.files);
    }
  };

  async function uploadImage(fileList: FileList) {
    const [file, filename] = [fileList[0], fileList[0].name];
    console.log(filename);
    const formData = new FormData();
    formData.append('title', filename);
    formData.append('file', file);

    const uploadRes = await axios.post(`${imageUploadUrl}/${id}`, formData);
    const uploadSuccess = uploadRes.data.success;

    if (uploadSuccess) {
      const getDatasetRes = await axios.get(`${datasetUrl}/${id}`);
      const dataset = getDatasetRes.data;
      setDataset(dataset);
    }
  }

  async function uploadDirectory(fileList: FileList) {
    const formData = new FormData();
    for (const key of Object.keys(fileList)) {
      const file = fileList[parseInt(key)];
      const filename = file.name;
      console.log(filename);
      formData.append('title', filename);
      formData.append('file', file);
    }

    const uploadRes = await axios.post(`${imageUploadUrl}/${id}`, formData);
    const uploadSuccess = uploadRes.data.success;

    if (uploadSuccess) {
      const getDatasetRes = await axios.get(`${datasetUrl}/${id}`);
      const dataset = getDatasetRes.data;
      setDataset(dataset);
    }
  }

  const uploadSelecter = (
    <>
      <Button sx={{ width: '100%' }}>
        <label htmlFor="filePicker" style={fileUploaderStyle} />
        File
      </Button>
      <br />
      <Button sx={{ width: '100%' }}>
        <label htmlFor="directoryPicker" style={fileUploaderStyle} />
        Directory
      </Button>
    </>
  );

  const FileUploader = () => (
    <Tooltip title={uploadSelecter} arrow>
      <Button variant="contained" css={buttonStyle}>
        <FilePicker onChange={onPickerChanged} />
        <DirectoryPicker onChange={onPickerChanged} />
        Image Upload
      </Button>
    </Tooltip>
  );

  const AnnoExportLink = () => (
    <Button variant="contained" css={buttonStyle}>
      <a href={`${annoExportUrl}/${id}`} style={annoExporterStyle} download></a>
      Export Anno
    </Button>
  );

  return (
    <>
      <h2>Image List</h2>
      <FileUploader />
      <AnnoExportLink />
      <Divider css={dividerStyle} />
    </>
  );
}

export default ImageSetController;
