import { redirect } from 'next/navigation';
import { ME } from '../social.data';

export default function ProfileIndexPage() {
  redirect(`/theme/social/profile/${ME.userId}`);
}
