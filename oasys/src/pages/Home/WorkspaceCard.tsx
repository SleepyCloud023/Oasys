import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

import { CardActions, css, styled } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';

import { Permission, Workspace } from './types/list-workspace';
import { deleteWorkspaceById } from '@api/workspace';
import ConfirmDelete from './ConfirmDelete';

type PropsWorkspaceCard = {
  userId: string;
  workspaceInfo: Workspace;
  setPermission: React.Dispatch<React.SetStateAction<Permission | null>>;
};

const StyledCard = styled(Card)`
  position: relative;
  & .MuiCardHeader-title {
    font-size: 1.5rem;
  }
  & .MuiCardHeader-subheader {
    font-size: 0.8rem;
  }
`;

const cardHeaderStyle = css`
  width: 100%;
`;

const linkStyle = {
  position: 'absolute' as 'absolute',
  width: '100%',
  height: '100%',
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function WorkspaceCard({
  userId,
  workspaceInfo,
  setPermission,
}: PropsWorkspaceCard) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const HeaderDeleteIcon = (
    <Tooltip title="Delete">
      <>
        <IconButton
          aria-label="settings"
          sx={{ color: grey[500] }}
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
        <ConfirmDelete
          open={open}
          userId={userId}
          workspaceInfo={workspaceInfo}
          setPermission={setPermission}
          handleClose={handleClose}
        />
      </>
    </Tooltip>
  );

  return (
    <StyledCard variant="outlined">
      <Link to={`/dataset/${workspaceInfo.id}`} style={linkStyle} />
      <CardHeader
        css={cardHeaderStyle}
        action={HeaderDeleteIcon}
        title={workspaceInfo.name}
        subheader={workspaceInfo.modification_date + ' (Last modified)'}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="https://mui.com/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Workspace Info</Typography>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
}

export default WorkspaceCard;
