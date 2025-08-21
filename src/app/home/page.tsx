import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import axios from 'axios';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
export const dynamic = 'force-dynamic';

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/auth');
  }

  const popularGames = await axios.get('http://localhost:3000/api/games/popular')
  
  return (
    <div>
      <Button>Logout</Button>
    </div>
  );
};

export default Page;
