import { FC } from 'react';
import {
  BreadcrumbsProps as MUIBreadcrumbsProps,
  Breadcrumbs as MUIBreadcrumbs,
  useTheme,
} from '@mui/material';

import { Link, Props as LinkProps } from '../Link/Link';
import { createStyles } from './Breadcrumbs.styles';

type Props = MUIBreadcrumbsProps & {
  items: (LinkProps & { isActive?: boolean })[];
  variant?: 'rounded';
};

const Breadcrumbs: FC<Props> = ({
  items,
  variant = undefined,
  ...MUIProps
}) => {
  const theme = useTheme();
  const styles = createStyles({ variant }, theme);

  return (
    <MUIBreadcrumbs css={styles.root()} {...MUIProps}>
      {items.map((itemProps) => {
        const { key, isActive, ...theRest } = itemProps;

        return <Link css={styles.item({ isActive })} key={key} {...theRest} />;
      })}
    </MUIBreadcrumbs>
  );
};

export type { Props };

export { Breadcrumbs };
