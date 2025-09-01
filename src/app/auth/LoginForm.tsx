'use client';

import React from 'react';
import { LoginUserType, LoginUser } from '../../types/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import ButtonLoader from '@/components/ButtonLoader';

type Props = {
  email: string;
  onError: (error: string) => void;
};

const LoginForm = ({ email, onError }: Props) => {
  const form = useForm<LoginUserType>({
    resolver: zodResolver(LoginUser),
    mode: 'onBlur',
    defaultValues: {
      email,
      password: '',
    },
  });

  const onSubmit = async (values: LoginUserType) => {
    await authClient.signIn.email(
      {
        ...values,
        rememberMe: true,
      },
      {
        onSuccess: () => {
          window.location.href = '/home';
        },
        onError: (ctx) => {
          onError(ctx.error.message);
        },
      }
    );
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'
        >
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='cursor-pointer'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <ButtonLoader /> : 'Login'}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
