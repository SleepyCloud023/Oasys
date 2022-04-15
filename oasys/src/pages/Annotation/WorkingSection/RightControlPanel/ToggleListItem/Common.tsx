import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import {
  IconButton,
  IconButtonProps,
  ListItem,
  ListItemProps,
  ListItemText,
} from '@mui/material';
import { styled, css } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectedHandler from '../SelectedHandler';

type ListItemContainerProps = { isSelected: boolean } & ListItemProps;

export const StyledListItemContainer = styled(
  ({ isSelected, ...props }: ListItemContainerProps) => <ListItem {...props} />,
)(
  ({ theme, isSelected }) => css`
    background-color: ${isSelected ? theme.palette.info.light : 'white'};
    border: 1px solid ${theme.palette.divider};
    border-radius: 3px;
    padding: 4px 8px;
    &:hover {
      background-color: ${theme.palette.info.light};
    }
  `,
);

export const StyledListItemText = styled(ListItemText)`
  margin: auto 6px;
  font-size: 0.8rem;
`;

export type ToggleListItemProps = {
  readonly index: number;
  readonly selectedHandler: SelectedHandler;
};

type DividerProps = { index: number };
export const OptionalDivider = ({ index }: DividerProps) =>
  index > 0 ? <Divider light /> : null;

type NumberChipProps = { id: number };
export const NumberChip = ({ id }: NumberChipProps) => (
  <Chip label={id} size={'small'} />
);

export const DeleteButton = (props: IconButtonProps) => (
  <IconButton sx={{ padding: 0 }} {...props}>
    <DeleteIcon fontSize="small"></DeleteIcon>
  </IconButton>
);
