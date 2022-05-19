import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../components/button';
import Form from '../components/form';
import FormField from '../components/formfield';
import Input from '../components/input';
import Link from '../components/link';
import { NotificationType, useNotification } from '../components/notification';
import Header from '../layouts/header';
import NotificationDrawer from '../layouts/notification-drawer';
import VerifyScreen from '../layouts/verify-screen';
import { login } from '../services/api/auth';
import ArrowRight from '../shapes/arrowright';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notificationsProps, sendNotification, handleNotificationClose] = useNotification();
  const [step, setStep] = useState<number>(0);
  const router = useRouter();

  const handleLogin = async () => {
    const { data, error } = await login({
      email,
      password,
    });

    if (error) {
      sendNotification({
        type: NotificationType.Error,
        title: 'Login failed',
        message: error.message,
      });
    } else if (!data.isVerified) {
      router.push({ query: { step: '1' } });
    } else {
      router.push('/');
    }
  }



  useEffect(() => {
    router.query.step == '1' ? setStep(1) : setStep(0);
  }, [router.query.step]);

  return (
    <div>
      <Header />
      <div className="width-container">
        {step === 0
          ? <Form
              title='Login'
              description='Login to your PolyCode account'
              actions={
                <Button onClick={handleLogin} icon={<ArrowRight className='button__icon' />}>Let&apos;s go</Button>
              }
            >
              <FormField label='Email'>
                <Input type='email' value={email} onChange={setEmail} placeholder='Enter your email address' />
              </FormField>
              <FormField label='Password'>
                <Input type='password' value={password} onChange={setPassword} placeholder='Enter your password' />
              </FormField>
              <Link href='/register'>Don&apos;t have an account?</Link>
            </Form>
          : <VerifyScreen
              email={email}
              password={password}
              onResendSuccess={() => {
                sendNotification({
                  type: NotificationType.Success,
                  title: 'Resend successful',
                  message: 'Please check your email for a confirmation link.',
                });
              }}
              onResendError={() => {
                sendNotification({
                  type: NotificationType.Error,
                  title: 'Resend failed',
                  message: 'Please make sure your email is correct.',
                });
              }}
            />}
      </div>
      <NotificationDrawer
        notificationsProps={notificationsProps}
        onNotificationClose={handleNotificationClose}
      />
    </div>
  );
}