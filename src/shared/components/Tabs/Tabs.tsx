import { FC } from 'react';
import {
  TabsProps as MUITabsProps,
  Tabs as MUITabs,
  Tab as MUITab,
} from '@mui/material';
import { SerializedStyles } from '@emotion/react';

type Props = MUITabsProps & {
  items: string[];
  ID: number[];
  tabStyles: SerializedStyles;
};

const Tabs: FC<Props> = ({ items, ID, tabStyles, ...MUIProps }) => {
  const selectedID = items.map((_label, i) => Math.round(ID[i]));

  return (
    <MUITabs {...MUIProps}>
      {items.map((label, i) => (
        <MUITab
          css={tabStyles}
          key={i}
          label={label}
          value={selectedID[i]}
          tabIndex={0}
        />
      ))}
    </MUITabs>
  );
};

export type { Props };

export { Tabs };
