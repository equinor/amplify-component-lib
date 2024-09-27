import { FC } from 'react';

import { ImpersonateUserDto } from '@equinor/subsurface-app-management';

interface DeleteUserProps {
  user: ImpersonateUserDto;
}

export const DeleteUser: FC<DeleteUserProps> = ({ user }) => {
  return <div>{user.uniqueName}</div>;
};
