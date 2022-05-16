import { FC } from 'react';
import {
  Accordion as MUIAccordion,
  AccordionProps as MUIAccordionProps,
  AccordionSummary as MUIAccordionSummary,
  AccordionSummaryProps as MUIAccordionSummaryProps,
  AccordionDetails as MUIAccordionDetails,
  AccordionDetailsProps as MUIAccordionDetailsProps,
} from '@mui/material';

type Props = Omit<MUIAccordionProps, 'children'> & {
  summary: MUIAccordionSummaryProps;
  details: MUIAccordionDetailsProps;
};

const Accordion: FC<Props> = ({ summary, details, ...MUIProps }) => {
  return (
    <MUIAccordion {...MUIProps}>
      <MUIAccordionSummary {...summary} />
      <MUIAccordionDetails {...details} />
    </MUIAccordion>
  );
};

export type { Props };

export { Accordion };
