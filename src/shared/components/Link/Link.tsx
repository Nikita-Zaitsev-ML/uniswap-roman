import { AnchorHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  styled,
  useTheme,
} from '@mui/material';

import { createStyles } from './Link.style';

// Add support for the sx prop for consistency with the other branches.
// eslint-disable-next-line @emotion/syntax-preference
const Anchor = styled('a')({});

type NextLinkComposedProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> &
  Omit<NextLinkProps, 'href' | 'as'> & {
    to: NextLinkProps['href'];
    linkAs?: NextLinkProps['as'];
    href?: NextLinkProps['href'];
  };

const NextLinkComposed = forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, ref) {
    const {
      to,
      linkAs,
      href,
      replace,
      scroll,
      shallow,
      prefetch,
      locale,
      ...other
    } = props;

    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref
        locale={locale}
      >
        <Anchor ref={ref} {...other} />
      </NextLink>
    );
  }
);

type Props = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  // Useful when the as prop is shallow by styled().
  linkAs?: NextLinkProps['as'];
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

/*
 * A styled version of the Next.js Link component:
 * https://nextjs.org/docs/api-reference/next/link
 */
const Link = forwardRef<HTMLAnchorElement, Props>(function Link(props, ref) {
  const {
    underline,
    href,
    noLinkStyle,
    role,
    as: linkAs,
    className: classNameProps,
    activeClassName = 'active',
    // Link don't have roles.
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const theme = useTheme();
  const styles = createStyles({ underline }, theme);
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal =
    typeof href === 'string' &&
    (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href} ref={ref} {...other} />;
    }

    return (
      <MuiLink
        css={styles.root()}
        className={className}
        href={href}
        ref={ref}
        underline={underline}
        {...other}
      />
    );
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposed className={className} ref={ref} to={href} {...other} />
    );
  }

  return (
    <MuiLink
      css={styles.root()}
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      to={href}
      underline={underline}
      {...other}
    />
  );
});

export type { Props };

export { Link, NextLinkComposed };
