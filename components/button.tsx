import Image from 'next/image';
import { useRouter } from 'next/router';

export type ButtonAction = string | (() => void);

export default function Button({
  children,
  onClick,
  icon,
  className,
  borderless=false,
  little=false,
  disabled=false,
}: {
  children: React.ReactNode;
  onClick: ButtonAction,
  icon?: string | React.ReactNode,
  className?: string,
  borderless?: boolean,
  little?: boolean,
  disabled?: boolean,
}) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (!disabled) {
      if (typeof onClick === 'function') {
        onClick();
      } else {
        router.push(onClick);
      }
    }
  }

  return (
    <button
      className={'button'
        + (borderless ? ' button--borderless' : '')
        + (little ? ' button--little' : '')
        + (disabled ? ' button--disabled' : '')
        + (className ? ' ' + className : '')}
      onClick={handleClick}
    >
      {children}
      {icon && typeof icon === 'string' ? (<Image src={icon} alt='' width={20} height={20} /> ) : icon}
    </button>
  );
}