'use client';
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react";
import { forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils"
import { ShoppingCart } from 'lucide-react';
import { IUser } from "@/models/Users";
import ThemeToggle from '@/components/theme/ThemeToggle';
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image";

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const MainNavigation = () => {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState<IUser>();

  const userName = session?.user?.name;
  const userSplit = session?.user?.name?.split(' ');
  const userInitials = `${userSplit?.[0][0]}${userSplit?.[1][0]}`;

  const handleSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  }

  useEffect(() => {
    if (session) {
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
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="flex flex-column px-10 py-5 justify-between bg-blue-600 max-sm:text-center max-sm:pl-0 max-sm:pr-0 max-sm:flex-col">
        <Link href="/" className="text-[40px]">Items Store</Link>
        <div className="flex flex-row gap-1 justify-center items-center ">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Button className="p-0" variant="outline">
                  <Skeleton className="h-5 w-[68px] mx-2" />
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button className="p-0" variant="outline">
                  <Skeleton className="h-5 w-[50px] mx-2" />
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button className="p-0" variant="outline">
                  <Skeleton className="h-5 w-[103px] mx-2" />
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant="outline" size="icon">
                  <Skeleton className="h-[1.2rem] w-[1.2rem] rounded-full animate-spin" />
                </Button>
              </NavigationMenuItem>
              <ThemeToggle />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-column px-10 py-5 justify-between bg-blue-600 max-sm:text-center max-sm:pl-0 max-sm:pr-0 max-sm:flex-col">
      <Link href="/" className="text-[40px]">Items Store</Link>
      <div className="flex flex-row gap-1 justify-center items-center ">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/store" legacyBehavior passHref>
                <NavigationMenuLink>
                  <Button className="text-[20px]" variant="outline">Store</Button>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {!session ? (
              <NavigationMenuItem>
                <Button className="text-[20px]" variant="outline" onClick={() => signIn()}>Sign In</Button>
              </NavigationMenuItem>
            ) : (
              <>
                <NavigationMenuItem>
                  <Link href="/publish" legacyBehavior passHref>
                    <NavigationMenuLink>
                      <Button className="text-[20px]" variant="outline">Sell</Button>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="max-sm:justify-start">
                  <NavigationMenuTrigger>
                    {session.user?.image ?
                      <div className="inline-flex">
                        <Avatar className="w-7 h-7 rounded-full mr-2">
                          <AvatarImage src={session.user?.image as string} alt="user" />
                          <AvatarFallback>{userInitials}</AvatarFallback>
                        </Avatar>
                      </div>
                      : null}
                    <span className="text-[20px]">{userSplit?.[0]}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-5 max-sm:w-screen md:w-[200px] lg:w-[300px] lg:grid-cols-[.75fr_1fr]"
                    >
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <>
                            <div className="mb-2 text-lg font-medium">
                              Welcome {userName}
                            </div>
                            {session?.user?.image ? (
                              <Image className="w-auto h-auto" src={session?.user?.image} alt="User" width={70} height={50} />
                            ) : null}
                          </>
                        </NavigationMenuLink>
                      </li>
                      <Link href="/user" legacyBehavior passHref>
                        <ListItem title="My Profile">
                          Check your profile
                        </ListItem>
                      </Link>
                      {currentUser?.role === 'admin' ? (
                        <Link href="/admin" legacyBehavior passHref>
                          <ListItem title="Panel">
                            Administrator Panel
                          </ListItem>
                        </Link>
                      ) : null}
                      <ListItem className="text-[30px] cursor-pointer" onClick={handleSignOut} title="Sign Out" />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/cart" legacyBehavior passHref>
                    <NavigationMenuLink>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon">
                              <ShoppingCart className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Cart</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
            <ThemeToggle />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

export default MainNavigation;
