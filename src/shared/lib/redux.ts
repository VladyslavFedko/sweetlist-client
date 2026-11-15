import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/store';

// Type-only import from the app layer: the single accepted exception to the FSD import rule.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
