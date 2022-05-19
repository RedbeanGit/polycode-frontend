import Button from '../components/button';
import { resend } from '../services/api/auth';
import Send from '../shapes/send';

export default function VerifyScreen({
  email,
  password,
  onResendSuccess,
  onResendError,
}: {
  email: string;
  password: string;
  onResendSuccess: () => void;
  onResendError: () => void;
}) {
  const handleResend = async () => {
    if (await resend({ email, password })) {
      onResendSuccess();
    } else {
      onResendError();
    }
  }

  return (
    <div className='verify-screen'>
      <h2 className='verify-screen__title'>Please check your email in-box to verify your account</h2>
      <p className='verify-screen__message'>If you don&apos;t see the email, check your spam folder.</p>
      <Button
        icon={<Send className='button__icon' />}
        onClick={handleResend}
        className='verify-screen__button'
      >
        Resend a verification email
      </Button>
    </div>
  );
}