import { RequestStatus } from './types';

const REQUEST_STATUS: Record<RequestStatus, RequestStatus> = {
  idle: 'idle',
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

export { REQUEST_STATUS };
