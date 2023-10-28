'use client';
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { IUser } from "@/models/Users";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminPanelPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
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
        setCurrentUser(data);
      });
    setLoading(false);
  }, [session]);

  useEffect(() => {
    if (currentUser?.role === 'user') {
      router.push('/')
    }
  }, [currentUser, router])

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="w-[450px]">
          <Card className="flex flex-col justify-center align-middle w-[450px] mt-10 p-5">
            <CardTitle className='px-6 pt-4 pb-4 text-center'>Loading...</CardTitle>
          </Card>
        </div>
      </div>
    )
  }

  if (currentUser?.role === 'admin') {
    return (
      <div className="flex justify-center">
        <div className="w-[450px]">
          <Card className="flex flex-col justify-center align-middle w-[450px] mt-10 p-5">
            <CardTitle className='px-6 pt-4 pb-4 text-center'>Protected Page</CardTitle>
            <CardDescription>You can view this page because you are an administrator.</CardDescription>
          </Card>
        </div>
      </div>
    )
  }
}
export default AdminPanelPage;
