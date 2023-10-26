'use client';
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { FC, PropsWithChildren } from "react"

export const Modal: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  }

  return (
    <Dialog
      open
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="flex max-w-xs flex-col rounded-lg sm:max-w-[425px]">
        {children}
      </DialogContent>
    </Dialog>
  )
}