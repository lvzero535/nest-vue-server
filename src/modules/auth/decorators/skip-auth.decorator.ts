import { SetMetadata } from '@nestjs/common';
import { SKIP_AUTH_KEY } from '../auth.constant';

export const SkipAuth = () => SetMetadata(SKIP_AUTH_KEY, true);
