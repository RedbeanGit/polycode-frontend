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
import { register } from '../services/api/auth';
import ArrowRight from '../shapes/arrowright';

export default function Register() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [notificationsProps, sendNotification, handleNotificationClose] = useNotification();
  const [step, setStep] = useState<number>(0);
  const router = useRouter();

  const verify = () => {
    if (password !== confirmPassword) {
      sendNotification({
        type: NotificationType.Error,
        title: 'Passwords do not match',
        message: 'Please make sure your passwords match.',
      });
      return false;
    }
    return true;
  }

  const handleRegister = async () => {
    if (!verify()) {
      return;
    }

    const { data, error } = await register({
      firstname: firstName,
      lastname: lastName,
      email,
      password,
    });

    if (error) {
      sendNotification({
        type: NotificationType.Error,
        title: 'Registration failed',
        message: error.message,
      });
    } else {
      router.push({ query: { step: '1' } });
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
          ? (
            <Form
              title='Register'
              description='Create a new PolyCode account'
              actions={
                <Button onClick={handleRegister} icon={<ArrowRight className='button__icon' />}>Let&apos;s go</Button>
              }
            >
              <FormField label='First name'>
                <Input type='text' value={firstName} onChange={setFirstName} placeholder='Enter your first name' />
              </FormField>
              <FormField label='Last name'>
                <Input type='text' value={lastName} onChange={setLastName} placeholder='Enter your last name' />
              </FormField>
              <FormField label='Email'>
                <Input type='email' value={email} onChange={setEmail} placeholder='Enter your email address' />
              </FormField>
              <FormField label='Password'>
                <Input type='password' value={password} onChange={setPassword} placeholder='Enter your password' />
              </FormField>
              <FormField label='Confirm password'>
                <Input type='password' value={confirmPassword} onChange={setConfirmPassword} placeholder='Confirm your password' />
              </FormField>
              <Link href='/login' className=''>Already have an account?</Link>
            </Form>)
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
          />
        }
      </div>
      <NotificationDrawer
        notificationsProps={notificationsProps}
        onNotificationClose={handleNotificationClose}
      />
    </div>
  );
}