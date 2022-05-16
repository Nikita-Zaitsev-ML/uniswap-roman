import { FC } from 'react';
import {
  CardProps as MUICardProps,
  Card as MUICard,
  CardContentProps as MUICardContentProps,
  CardContent as MUICardContent,
  CardActionsProps as MUICardActionsProps,
  CardActions as MUICardActions,
} from '@mui/material';

type Props = MUICardProps & {
  content: MUICardContentProps;
  actions?: MUICardActionsProps;
};

const Card: FC<Props> = ({ content, actions = null, ...MUIProps }) => {
  return (
    <MUICard {...MUIProps}>
      <MUICardContent {...content} />
      {actions && <MUICardActions {...actions} />}
    </MUICard>
  );
};

export type { Props };

export { Card };
