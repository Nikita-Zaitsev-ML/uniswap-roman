import { FC } from 'react';
import {
  BreadcrumbsProps as MUIBreadcrumbsProps,
  Breadcrumbs as MUIBreadcrumbs,
} from '@mui/material';

import { Link, Props as LinkProps } from '../Link/Link';

type Props = MUIBreadcrumbsProps & {
  items: LinkProps[];
};

const Breadcrumbs: FC<Props> = ({ items, ...MUIProps }) => {
  return (
    <MUIBreadcrumbs {...MUIProps}>
      {items.map((itemProps) => {
        const { key, ...theRest } = itemProps;

        return <Link key={key} {...theRest} />;
      })}
    </MUIBreadcrumbs>
  );
};

export type { Props };

export { Breadcrumbs };
