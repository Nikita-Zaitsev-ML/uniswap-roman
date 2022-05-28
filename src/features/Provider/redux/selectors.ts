import type { AppState } from 'src/app/store';

const selectProvider = (state: AppState) => state.features.Provider;

export { selectProvider };
