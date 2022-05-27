import type { AppState } from 'src/app/store';

const selectContainer = (state: AppState) => state.features.Container;

export { selectContainer };
