"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton";

const ThemeToggle = () => {
  const { data: session, status } = useSession();
  // Mounted and loading states to prevent hydration issues
  const [hasMounted, setHasMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setHasMounted(true);
    setLoaded(true);
  }, [setTheme]);

  useEffect(() => {
    if (session) {
      fetch('http://localhost:3000/api/user')
        .then(response => response.json())
        .then(data => {
          setTheme(data?.[0]?.theme || 'light');
        });
    }
  }, [status, session, setTheme]);

  const handleThemeToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
      fetch('http://localhost:3000/api/user', {
        method: 'PUT',
        body: JSON.stringify({
          ...session?.user,
          theme: 'dark'
        })
      })
    } else {
      setTheme('light');
      fetch('http://localhost:3000/api/user', {
        method: 'PUT',
        body: JSON.stringify({
          ...session?.user,
          theme: 'light'
        })
      })
    };
  };

  return (
    <>
      {hasMounted && theme === 'light' ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleThemeToggle}>
                {loaded ? (
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                ) : (
                  <Skeleton className="mr-2 h-4 w-4 rounded-full animate-spin" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Day Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleThemeToggle}>
                {loaded ? (
                  <Moon className="h-[1.2rem] w-[1.2rem] rotate-45 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                ) : (
                  <Skeleton className="h-[1.2rem] w-[1.2rem] rounded-full animate-spin" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Night Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  )
}

export default ThemeToggle;