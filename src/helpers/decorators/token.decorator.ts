import { createParamDecorator } from '@nestjs/common';
import { getToken } from '@/src/helpers/secure';

export const Token = createParamDecorator((data, req) => {
  return getToken({ req });
});
