'use client';

import React, { ReactNode, useState } from 'react';
import RegisterForm from './RegisterForm';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import Heading from '@/components/Heading';
import Github from '@/components/icons/Github';
import BaseForm from './BaseForm';
import LoginForm from './LoginForm';

const Auth = () => {
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [email, setEmail] = useState('');

  const getForm = (): ReactNode => {
    if (emailExists === null)
      return (
        <BaseForm
          onCheckEmail={setEmailExists}
          onSetStatus={setStatusMessage}
          onSetEmail={setEmail}
        />
      );
    if (emailExists) return <LoginForm email={email}/>;

    return <RegisterForm email={email}/>;
  };

  return (
    <main className='h-dvh flex items-center'>
      <div className='flex flex-col w-full md:max-w-[600px] mx-auto gap-4 p-4'>
        <Heading className='mb-8' />
        {getForm()}
        {statusMessage && statusMessage}
        <Button
          type='button'
          variant='secondary'
          className='cursor-pointer'
          onClick={async () =>
            await authClient.signIn.social({
              provider: 'github',
            })
          }
        >
          <Github /> Sign up with Github
        </Button>
      </div>
    </main>
  );
};

export default Auth;
