import Notification from '../components/notification';
import { NotificationProps } from '../components/notification';

export default function NotificationDrawer({
  notificationsProps,
  onNotificationClose,
}: {
  notificationsProps: NotificationProps[],
  onNotificationClose: (index: number) => void,
}) {
  return (
    <div className="notification-drawer">
      {notificationsProps.map((notificationProps, index) => (
        <Notification
          key={index}
          onExpire={() => onNotificationClose(index)}
          {...notificationProps}
        />
      ))}
    </div>
  )
}