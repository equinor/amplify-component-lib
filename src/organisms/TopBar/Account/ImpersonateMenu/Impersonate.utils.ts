import { ImpersonateUserDto } from '@equinor/subsurface-app-management';

export function impersonateUserDtoToFullName(
  dto: Pick<ImpersonateUserDto, 'firstName' | 'lastName'>
): string {
  return `${dto.firstName} ${dto.lastName}`;
}
