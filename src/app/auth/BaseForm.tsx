'use client';

import axios, { AxiosError } from 'axios';
import React from 'react';
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
import z from 'zod';

type Props = {
  onCheckEmail: (emailExists: boolean) => void;
  onSetStatus: (message: string) => void;
  onSetEmail: (email: string) => void;
};

const BaseForm = ({ onCheckEmail, onSetStatus, onSetEmail }: Props) => {
  const form = useForm<{
    email: string;
  }>({
    resolver: zodResolver(
      z.object({
        email: z.email(),
      })
    ),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      await axios.post('/api/auth/verify_user', {
        email,
      });

      onCheckEmail(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          return onCheckEmail(false);
        }
        if (error.status === 403) {
          onSetStatus(
            error.response?.data.message ?? 'User has used github provider'
          );
        }
      }
    } finally {
      onSetEmail(email);
    }
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

          <Button type='submit' className='cursor-pointer'>
            Continue
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BaseForm;
