import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import Error from '../shapes/error';
import Info from '../shapes/info';
import Success from '../shapes/success';
import Warning from '../shapes/warning';

export enum NotificationType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export interface NotificationProps {
  type: NotificationType;
  title: string;
  message: string;
}

export function useNotification(): [
  NotificationProps[],
  (notificationProps: NotificationProps) => void,
  (index: number) => void,
] {
  const [notificationsProps, setNotificationsProps] = useState<NotificationProps[]>([]);

  const handleNotificationClose = (index: number) => {
    setNotificationsProps(notificationsProps.filter((_, i) => i !== index));
  };

  const sendNotification = (notificationProps: NotificationProps) => {
    setNotificationsProps(notificationsProps.concat([notificationProps]));
  };

  return [
    notificationsProps,
    sendNotification,
    handleNotificationClose,
  ];
}

export default function Notification({
  title,
  message,
  type,
  onExpire,
}: {
  title: string;
  message: string
  type: NotificationType;
  onExpire: () => void;
}) {
  let icon: ReactNode;
  switch (type) {
    case NotificationType.Info:
      icon = <Info className={`notification__icon notification__icon--${type}`} />;
      break;
    case NotificationType.Success:
      icon = <Success className={`notification__icon notification__icon--${type}`} />;
      break;
    case NotificationType.Warning:
      icon = <Warning className={`notification__icon notification__icon--${type}`} />;
      break;
    case NotificationType.Error:
      icon = <Error className={`notification__icon notification__icon--${type}`} />;
      break;
  }

  useEffect(() => {
    const timeout = setTimeout(onExpire,
      Math.max(message.split(' ').length * 900, 4000)
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [onExpire]);

  return (
    <div className={`notification notification--${type}`}>
      {icon}
      <div className='notification__content'>
        <p className={`notification__title notification__title--${type}`}>{title}</p>
        <p className={`notification__message notification__message--${type}`}>{message}</p>
      </div>
    </div>
  );
}