import { RequestStatus } from './types';

const REQUEST_STATUS: Record<RequestStatus, string> = {
  idle: 'idle',
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

export { REQUEST_STATUS };
