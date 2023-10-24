"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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
        <Button variant="outline" size="icon" onClick={handleThemeToggle}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        </Button>
      ) : (
        <Button variant="outline" size="icon" onClick={handleThemeToggle}>
          {theme === 'dark' && loaded ? (
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-45 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          ) : (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
        </Button>
      )}
    </>
  )
}

export default ThemeToggle;