# Styling

- [what's in the project](#what-is-in-the-project);
- [what should be used](#what-should-be-used);
- [examples](#examples);
- [additional tools](#additional-tools).

## What is in the project

- stylization methods:
  - [importing css files](https://nextjs.org/docs/basic-features/built-in-css-support#adding-a-global-stylesheet), but remember the [CSS insertion order when using the material UI](https://next.material-ui.com/guides/interoperability/#css-injection-order);
  - [CSS modules](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css), but remember the [the order of CSS insertion when using the material UI](https://next.material-ui.com/guides/interoperability/#css-modules);
  - CSS-in-JS solution: [nextJS docs](https://nextjs.org/docs/basic-features/built-in-css-support#css-in-js), [emotion with material UI](https://next.material-ui.com/guides/interoperability/#emotion). P.S.: the project supports [`sx` props](https://next.material-ui.com/system/basics/#why-use-the-system), but it's not worth using it.
- additional inclusions:
  - automation:
    - [global CSS](/src/pages/_app.css);
    - [normalize.css](https://github.com/csstools/postcss-normalize);
    - [CSSBaseline](https://next.material-ui.com/components/css-baseline/).
  - independent use:
    - [material icons](https://mui.com/components/icons/#material-icons).

## What should be used

- [emotion/react](https://emotion.sh/docs/@emotion/react) as the main tool (use from `'@mui/material'`), read more: [emotion css prop](https://emotion.sh/docs/css-prop), [composition](https://emotion.sh/docs/composition), [nesting](https://emotion.sh/docs/nested), [media](https://emotion.sh/docs/media-queries), [themization](https://emotion.sh/docs/theming). It is also not recommended to use [object styles](https://emotion.sh/docs/object-styles) and [styled components](https://emotion.sh/docs/styled) due to poor listing support and difficult readability;
- [material UI](https://mui.com/ru/guides/interoperability/#emotion) as the main framework, read more: [material design](https://material.io/design/environment/surfaces.html#properties);
- [storybook](https://storybook.js.org/) to create, test and document UI.

The main reason for using CSS-in-JS: the `props` react components can be used directly and dynamically - no need to create +100500 [modifiers](https://ru.bem.info/methodology/block-modification/) for each unique value.

## Examples

### Basic example

File `Button.style.ts`

```ts
import { css } from '@mui/material';

import { Theme } from 'src/shared/styles/theme';

import type { Props } from './Button';

const createStyles = (
  // common props
  props: Pick<Props, 'isPrimary' | 'size' | 'backgroundColor'>,
  theme: Theme
) => ({
  /*
   * This is the root element of the component, it should always have the name root.
   */
  root: () => {
    const isPrimary = props.isPrimary
      ? css`
          background-color: ${theme.palette.primary.main};
          color: ${theme.palette.primary.contrastText};
        `
      : css`
          background-color: ${theme.palette.secondary.main};
          color: ${theme.palette.secondary.contrastText};
        `;
    const backgroundColor =
      props.backgroundColor &&
      css`
        background-color: ${props.backgroundColor};
      `;

    let size;

    switch (props.size) {
      case 'small': {
        size = css`
          padding: ${theme.spacing(0.5, 1)};
          font-size: ${theme.typography.pxToRem(12)};
        `;

        break;
      }
      case 'medium': {
        size = css`
          padding: ${theme.spacing(1, 2)};
          font-size: ${theme.typography.pxToRem(14)};
        `;

        break;
      }
      case 'large': {
        size = css`
          padding: ${theme.spacing(1.5, 3)};
          font-size: ${theme.typography.pxToRem(16)};
        `;

        break;
      }
      default: {
        size = '';
      }
    }

    return css`
      display: inline-block;
      border: 0;
      font-weight: ${theme.typography.button.fontWeight};
      font-family: ${theme.typography.button.fontFamily};
      line-height: ${theme.typography.button.lineHeight};

      ${isPrimary}
      ${size}
      ${backgroundColor}
    `;
  },
});

export { createStyles };
```

File `Button.tsx`

```tsx
import { FC, CSSProperties } from 'react';
import { useTheme } from '@mui/material';

import { createStyles } from './Button.style';

type Props = {
  /**
   * Button Content
   */
  label: string;

  /**
   * Is this the main call to action on the page?
   */
  isPrimary?: boolean;

  /**
   * How big should the button be?
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Which background to use
   */
  backgroundColor?: CSSProperties['backgroundColor'];

  /**
   * Optional click handler
   */
  onClick?: () => void;
};

/**
 * The main UI component for user interaction
 */
const Button: FC<Props> = ({
  label,
  backgroundColor,
  isPrimary = false,
  size = 'medium',
  ...theRestProps
}) => {
  const theme = useTheme();
  const styles = createStyles({ isPrimary, size, backgroundColor }, theme);

  return (
    <button type="button" css={styles.root()} {...theRestProps}>
      {label}
    </button>
  );
};

export type { Props };

export { Button };
```

### Descendant Selectors

We can't use [.name](https://github.com/emotion-js/emotion/issues/1217 ) and agreed not to use [object style](https://emotion.sh/docs/object-styles#child-selectors ), also self-naming: [Material UI](https://next.material-ui.com/customization/how-to-customize/#overriding-nested-component-styles ) or [BEM](https://github.com/albburtsev/bem-cn ) redundant since the class name is generated automatically based on the environment. So if you need a descendant selector there are 3 options:

- use [ACCESS trick](https://amcss.github.io/) paired with the [label property](https://emotion.sh/docs/labels ) `[class*="label-name"]{}`;
- pass arguments for component elements from the component to the element styling function;
- set a class selector to a component element in the markup and use it for styling in a style file - this approach is desirable [to use](https://mui.com/customization/how-to-customize/#overriding-nested-component-styles ) with no more than MUI components: the method is less convenient because you have to change more files and maintain class isolation or use modular css.

### Themization

Modify [theme files](/src/services/theme/modes) and use `useTheme()` from `@mui/material` to access the theme from the component (or `withTheme` HOC if you are sure of using the class component), read the [documentation](https://mui.com/customization/theming/) for details.

## Additional tools

- [theme creation](https://mui.com/customization/theming/#theme-builder);
- [templates](https://mui.com/getting-started/templates/).
