import { logger } from '@/src/core/logger';

// export const CATCHED_CODE = Object.keys(ErrorRoute).map(Number);
// export type CatchedCode = keyof typeof ErrorRoute;

export class FetchError implements Error {
  name: string;
  message: string;
  code: number;
  constructor(code: number, message?: string) {
    this.name = `接口异常`;
    this.code = code;
    this.message = message || `接口异常[${code}]`;
  }
}

export function reportError(_error: any) {
  logger.error(_error);
}

// fetch异常
export const onUnhandledrejection = (e: any) => {
  if (process.env.SUNMI_ENV === 'pub') {
    reportError(e);
    e.preventDefault();
  }
};

export const onWindowError = (e: any) => {
  if (process.env.SUNMI_ENV === 'pub') {
    reportError(e);
    e.preventDefault();
  }
};

// https://reactjs.org/docs/error-boundaries.html
