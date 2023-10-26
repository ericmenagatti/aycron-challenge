'use client';
import { IUser } from "@/models/Users";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminPanelPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUser>();

  useEffect(() => {
    fetch('http://localhost:3000/api/user', {
      method: 'POST',
      body: JSON.stringify({
        ...session?.user,
        role: 'user',
      })
    });
    fetch('http://localhost:3000/api/user')
      .then(response => response.json())
      .then(data => {
        setCurrentUser(data?.[0]);
      });
    setLoading(false);
  }, [session]);

  useEffect(() => {
    if (currentUser?.role === 'user') {
      router.push('/')
    }
  }, [currentUser, router])

  if (loading) {
    return <p>Loading...</p>
  }

  if (currentUser?.role === 'admin') {
    return (
      <>
        <h1>Protected Page</h1>
        <p>You can view this page because you are an administrator.</p>
      </>
    )
  }

  return <p></p>
}
export default AdminPanelPage;
