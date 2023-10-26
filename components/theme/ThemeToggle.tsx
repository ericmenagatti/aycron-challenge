"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"

const ThemeToggle = () => {
  // Mounted and loading states to prevent hydration issues
  const [hasMounted, setHasMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setHasMounted(true);
    setLoaded(true);
  }, [])

  const handleThemeToggle = () => {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  }

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