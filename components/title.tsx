import Image from 'next/image';
import Link from './link';

export default function Title() {
  return (
    <Link href="/" className='title'>
      <Image src="/images/logo.png" alt="Logo" width={50} height={50} className='title__image' />
      <h1 className='title__text'>Polycode</h1>
    </Link>
  );
}