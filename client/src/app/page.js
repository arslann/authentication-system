import LoginForm from '@/components/LoginForm';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
