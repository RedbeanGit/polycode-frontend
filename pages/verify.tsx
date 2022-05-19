import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NotificationType, useNotification } from '../components/notification';
import Header from '../layouts/header';
import NotificationDrawer from '../layouts/notification-drawer';
import { verify } from '../services/api/auth';

export default function Verify() {
  const router = useRouter();
  const [notificationsProps, sendNotification, handleNotificationClose] = useNotification();
  const { code } = router.query;

  useEffect(() => {
    const fetchData = async (code: string) => {
      const { error } = await verify({ code });

      if (error) {
        sendNotification({
          type: NotificationType.Error,
          title: 'Verification failed',
          message: error.message,
        });
      } else {
        return await router.push('/');
      }
    }
    const codeNumber = String(code);
    fetchData(codeNumber);
  }, [])

  return (
    <div>
      <Header />
      <div className='width-container'>
        <h2>Verify</h2>
        <p>Checking your email...</p>
      </div>
      <NotificationDrawer
        notificationsProps={notificationsProps}
        onNotificationClose={handleNotificationClose}
      />
    </div>
  )
}