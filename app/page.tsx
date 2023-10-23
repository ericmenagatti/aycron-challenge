'use client';

import Image from 'next/image';
import { useSession, signIn, signOut } from "next-auth/react";

const HomePage = () => {
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <>
          <p>Not signed in</p>
          <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      ) : (
        <>
          <p>Welcome back {session.user?.name}!</p>
          {session.user?.image ?
            <Image src={session.user?.image as string} alt="Profile picture" width={96} height={96} />
            : null}
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  )
}
export default HomePage;