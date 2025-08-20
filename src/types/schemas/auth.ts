import { z } from 'zod';

export const RegisterUser = z
  .object({
    email: z.email(),
    name: z.string(),
    image: z.string(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const LoginUser = z.object({
  email: z.email(),
  password: z.string(),
});

export type RegisterUserType = z.infer<typeof RegisterUser>;
export type LoginUserType = z.infer<typeof LoginUser>;
