import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'src/users/enum/users.enum';

export const Roles = (...roles: ROLE[]) => SetMetadata('roles', roles);
