/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  Tooltip,
  Card,
  CardHeader,
  Chip,
  CardContent,
  Typography,
  css,
  tooltipClasses,
  TooltipProps,
  CardProps,
} from '@mui/material';
import { BoxObject, Point } from '../types';
import { styled } from '@mui/system';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(
  ({ theme }) => css`
    & .${tooltipClasses.arrow} {
      color: ${theme.palette.secondary.main};
      /* color: black; */
    }
    & .${tooltipClasses.tooltip} {
      /* background-color: ${theme.palette.secondary.main}; */
      background-color: transparent;
    }
  `,
);

const StyledCard = styled((props: CardProps) => (
  <Card elevation={4} {...props} />
))(
  ({ theme }) => css`
    background-color: white;
  `,
);

const StyledCardHeader = styled(CardHeader)(
  ({ theme }) => css`
    background-color: ${theme.palette.secondary.main};
    border-radius: 4px;
    padding: 8px 8px;
    align-items: center;
    & .MuiCardHeader-avatar {
      margin-right: 6px;
    }
  `,
);
const StyledCardContent = styled(CardContent)(
  ({ theme }) => css`
    border-radius: 4px;
    padding-left: 8px;
    padding-top: 16px;
  `,
);

type PropsBoxTooltip = {
  boxObject: BoxObject;
  children: React.ReactElement<any, any>;
};

export function BoxTooltip({ boxObject, ...props }: PropsBoxTooltip) {
  const { ObjectId, ClassName, Bbox, Extra } = boxObject;
  const propertyLabel = (label: string) => (
    <Chip
      label={label}
      variant="outlined"
      size="small"
      component="span"
      sx={{
        background: (theme) => theme.palette.secondary.light,
        border: 'none',
        marginRight: '0.5rem',
      }}
    />
  );
  const tooltipContent = (
    <StyledCard>
      <StyledCardHeader
        avatar={
          <Chip
            label={ObjectId}
            size="small"
            sx={{ background: (theme) => theme.palette.secondary.light }}
          />
        }
        // title="Bounding Box Object"
        title="Details"
      />
      <StyledCardContent>
        <Typography variant="body2">
          {propertyLabel('Class')}
          {ClassName.length > 0 ? ClassName.join() : '[]'}
        </Typography>
        <Typography variant="body2">
          {propertyLabel('Points')}
          {Bbox.map((point: Point) => `(${point.toString()})`).join(',')}
        </Typography>
        <Typography variant="body2">
          {propertyLabel('Extra')}
          {Extra.map(({ key, value }) => `${key}: ${value}`)}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
  return (
    <StyledTooltip
      {...props}
      arrow
      placement="left-start"
      title={tooltipContent}
    />
  );
}
