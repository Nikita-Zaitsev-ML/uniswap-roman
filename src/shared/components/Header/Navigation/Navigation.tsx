import { FC, useState, useEffect, MouseEvent, KeyboardEvent } from 'react';
import { alpha, useTheme } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';

import { useWidth } from 'src/shared/styles/theme';
import { dispatchClickOnKeyDown } from 'src/shared/helpers/scripts/UIEvents';

import { Link, Props as LinkProps } from '../../Link/Link';
import { IconButton } from '../../IconButton/IconButton';
import { MenuIcon } from '../../Icon';
import { Menu } from '../../Menu/Menu';
import { Breadcrumbs } from '../../Breadcrumbs/Breadcrumbs';
import { NavigationItem } from '../types';
import { createStyles } from './Navigation.style';

type Props = {
  items: NavigationItem[];
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
};

const Navigation: FC<Props> = ({ items, onMenuOpen, onMenuClose }) => {
  const [id, setID] = useState<string>();
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLElement | null>(null);
  const theme = useTheme();
  const styles = createStyles({}, theme);

  useEffect(() => {
    setID(nanoid());
  }, []);

  const openMenu = (anchorEl: HTMLElement) => {
    setMenuAnchorElement(anchorEl);
  };

  const closeMenu = () => {
    setMenuAnchorElement(null);
  };

  const handleMenuButtonClick = (event: MouseEvent<HTMLElement>) => {
    const { currentTarget } = event;

    openMenu(currentTarget);

    onMenuOpen?.();
  };

  const handleMenuClose = () => {
    closeMenu();

    onMenuClose?.();
  };

  const handleMenuItemKeyDown = (event: KeyboardEvent) => {
    const { currentTarget, repeat, code } = event;

    dispatchClickOnKeyDown({
      currentTarget: currentTarget.querySelector('.js-MuiLink-root'),
      repeat,
      code,
    });
  };

  const width = useWidth();
  const shouldCollapse = width === 'xs' || width === 'sm';
  const shouldCloseMenu = !shouldCollapse && menuAnchorElement !== null;

  if (shouldCloseMenu) {
    setMenuAnchorElement(null);
  }

  const menuItems = items.map((item) => {
    const { key, isCurrentPage, ...theRest } = item;
    const color = isCurrentPage
      ? alpha(theme.palette.primary.contrastText, 1)
      : alpha(theme.palette.primary.contrastText, 0.74);

    return {
      key,
      onKeyDown: handleMenuItemKeyDown,
      children: (
        <Link
          underline="hover"
          color={color}
          classes={{ root: 'js-MuiLink-root' }}
          {...theRest}
        />
      ),
    };
  });

  const breadcrumbsItems: LinkProps[] = items.map((item) => {
    const { isCurrentPage, ...theRest } = item;
    const color = isCurrentPage
      ? alpha(theme.palette.primary.contrastText, 1)
      : alpha(theme.palette.primary.contrastText, 0.74);
    const ariaCurrent = isCurrentPage && 'page';

    return {
      color,
      underline: 'hover',
      'aria-current': ariaCurrent,
      ...theRest,
    };
  });

  return (
    <>
      <IconButton
        css={styles.menuButton()}
        size="large"
        aria-label="меню навигации"
        aria-controls={id}
        aria-haspopup="true"
        onClick={handleMenuButtonClick}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        css={styles.menu()}
        id={id}
        anchorEl={menuAnchorElement}
        open={Boolean(menuAnchorElement)}
        onClose={handleMenuClose}
        items={menuItems}
        keepMounted
      />
      <Breadcrumbs
        css={styles.breadcrumbs()}
        separator=""
        aria-label="хлебные крошки"
        items={breadcrumbsItems}
      />
    </>
  );
};

export type { Props };

export { Navigation };
