import type { AppState } from 'src/app/store';

const selectPools = (state: AppState) => state.features.Pools;

export { selectPools };
