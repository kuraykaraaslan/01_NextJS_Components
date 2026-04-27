'use client';
import { Avatar } from '@/modules/ui/Avatar';
import { SafeUser } from '../types';


type UserAvatarProps = {
  user: SafeUser;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
};

export function UserAvatar({ user, size = 'md', status, className }: UserAvatarProps) {
  const name = user.userProfile?.name ?? user.email;
  const src  = user.userProfile?.profilePicture ?? null;

  return <Avatar src={src} name={name} size={size} status={status} className={className} />;
}
