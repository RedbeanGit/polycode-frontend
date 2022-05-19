import Image from 'next/image';
import UserShape from '../shapes/user';
import Link from './link';

export enum NavLocation {
  Home = 'Home',
  Challenge = 'Challenge',
  Certificate = 'Certificate',
  Practice = 'Practice',
}

export default function NavBar({ location }: { location: NavLocation }) {
  return (
    <nav className='navbar'>
      <Link href="/exercice-sets?type=challenge" className='navbar__link'>Challenge</Link>
      <Link href="/certificates" className='navbar__link'>Certificate</Link>
      <Link href="/exercice-sets?type=practice" className='navbar__link'>Practice</Link>
      <Link href="/logout" className='navbar__link navbar__link--icon'>
        <UserShape className='navbar__icon' />
      </Link>
    </nav>
  )
}