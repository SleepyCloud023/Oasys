const filePickerStyle = {
  position: 'absolute',
  visibility: 'hidden',
};

const onClick = (e) => {
  e.currentTarget.value = '';
};

export function FilePicker({ onChange }) {
  return (
    <input
      id="filePicker"
      style={filePickerStyle}
      type="file"
      onChange={onChange}
      onClick={onClick}
    ></input>
  );
}

export function DirectoryPicker({ onChange }) {
  return (
    <input
      id="directoryPicker"
      style={filePickerStyle}
      type="file"
      webkitdirectory="true"
      onChange={onChange}
      onClick={onClick}
    ></input>
  );
}
