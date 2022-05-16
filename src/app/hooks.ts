import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppState, AppDispatch } from './store';

// Use throughout the application instead of the usual `useDispatch` and `useSelector`
const useAppDispatch = () => useDispatch<AppDispatch>();

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export { useAppDispatch, useAppSelector };
