'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const HomePage = () => {
  const { data: session } = useSession();
  return (
    <>
      {!session ? (
        <div className="inline-flex">
          <p className='text-2xl font-bold'>Not signed in</p>
          <br />
          <Button onClick={() => signIn()}>Sign in</Button>
        </div>
      ) : (
        <>
          <p className='text-2xl font-bold'>Welcome back {session.user?.name}!</p>
          {session.user?.image ?
            <div className="inline-flex">
              <Avatar>
                <AvatarImage src={session.user?.image as string} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            : null}
          <br />
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )}
    </>
  )
}
export default HomePage;