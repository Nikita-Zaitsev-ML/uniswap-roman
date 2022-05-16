import { FC, CSSProperties, useState } from 'react';

import { convertColor } from 'src/shared/helpers/materialUI/colors';

import { Grid, Props as GridProps } from '../Grid/Grid';
import { ColorBox, Props as ColorBoxProps } from './ColorBox/ColorBox';
import { createStyles } from './Palette.style';

type Props = {
  name?: string;
  items?: (ColorBoxProps & { identifier: string })[];
  rowSpacing?: GridProps['rowSpacing'];
  columnSpacing?: GridProps['columnSpacing'];
  onSelect?: (event: {
    identifier: string;
    backgroundColor: CSSProperties['backgroundColor'];
  }) => void;
};

const Palette: FC<Props> = ({
  name = 'palette',
  items = [],
  rowSpacing = 15,
  columnSpacing = 32,
  onSelect,
}) => {
  const checkedItem = items.find((item) => item.checked);
  const checkedBackgroundColor = checkedItem?.backgroundColor;

  const styles = createStyles();
  const [value, setValue] = useState<ColorBoxProps['backgroundColor']>(
    convertColor(checkedBackgroundColor || '#000000', { outputFormat: 'hex' })
  );

  const handleInputChange = () => {};

  const handleColorBoxClick: Props['onSelect'] = ({
    identifier,
    backgroundColor,
  }) => {
    if (backgroundColor !== undefined) {
      setValue(backgroundColor);
    }

    onSelect?.({ identifier, backgroundColor });
  };

  return (
    <>
      <input
        css={styles.input()}
        type="color"
        name={name}
        value={value}
        onChange={handleInputChange}
      />
      <Grid container rowSpacing={rowSpacing} columnSpacing={columnSpacing}>
        {items.map(({ identifier, title, color, backgroundColor, checked }) => (
          <Grid key={identifier} item>
            <ColorBox
              identifier={identifier}
              title={title}
              color={color}
              backgroundColor={backgroundColor}
              checked={checked}
              onClick={handleColorBoxClick}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export type { Props };

export { Palette };
