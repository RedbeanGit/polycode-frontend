import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NotificationType, useNotification } from '../components/notification';
import Header from '../layouts/header';
import NotificationDrawer from '../layouts/notification-drawer';
import { logout } from '../services/api/auth';

export default function Logout() {
  const [notificationsProps, sendNotification, handleNotificationClose] = useNotification();
  const router = useRouter();

  useEffect(() => {
    const fetchLogout = async () => {
      if (await logout()) {
        router.push('/login');
      } else {
        sendNotification({
          type: NotificationType.Error,
          title: 'Failed to logout',
          message: 'Please try again later',
        });
      }
    };
    fetchLogout();
  }, [sendNotification, router]);

  return (
    <div>
      <Header />
      <div className='width-container'>
        <h2>Logout</h2>
        <p>Logging out, please wait...</p>
      </div>
      <NotificationDrawer
        notificationsProps={notificationsProps}
        onNotificationClose={handleNotificationClose}
      />
    </div>
  )
}