'use client';

import React from 'react';
import { RegisterUser, RegisterUserType } from '../../types/schemas/auth';
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
import { useRouter } from 'next/navigation';
import ButtonLoader from '@/components/ButtonLoader';

type Props = {
  email: string;
  onError: (error: string) => void;
};

const RegisterForm = ({ email, onError }: Props) => {
  const router = useRouter();

  const form = useForm<RegisterUserType>({
    resolver: zodResolver(RegisterUser),
    mode: 'onBlur',
    defaultValues: {
      email,
      image: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterUserType) => {
    await authClient.signUp.email(
      {
        ...values,
      },
      {
        onSuccess: () => {
          router.push('/home');
        },
        onError: (ctx) => {
          onError(ctx.error.message);
        },
      }
    );
  };

  return (
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
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name:</FormLabel>
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
        <FormField
          name='confirmPassword'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password:</FormLabel>
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
          {form.formState.isSubmitting ? <ButtonLoader /> : 'Register'}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
