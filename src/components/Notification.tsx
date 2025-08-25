import { InfoIcon } from 'lucide-react';
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

type Props = {
  title?: string;
  text: string;
  isError?: boolean;
};

const Notification = ({ text, title, isError }: Props) => (
  <Alert variant={isError ? 'destructive' : 'default'} className={`${isError ? 'border-red-500' : ''}`}>
    <InfoIcon />
    {title && <AlertTitle>{title}</AlertTitle>}
    <AlertDescription>{text}</AlertDescription>
  </Alert>
);

export default Notification;
