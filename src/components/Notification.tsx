import { InfoIcon } from 'lucide-react';
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';

type Props = {
  title?: string;
  text: string;
};

const Notification = ({ text, title }: Props) => (
  <Alert>
    <InfoIcon />
    {title && <AlertTitle>{title}</AlertTitle>}
    <AlertDescription>{text}</AlertDescription>
  </Alert>
);

export default Notification;
