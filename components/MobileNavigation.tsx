"use client";

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { avatarPlaceholder, navItems } from '@/constants';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import logout from '@/actions/logout';
import FileUploader from './FileUploader';


const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const user = useCurrentUser();

  return (
    <header className="mobile-header">
      <div className="">LOGO</div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="search"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetHeader>
            <SheetTitle>
              <div className="header-user">
                <Image
                  src={avatarPlaceholder}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="header-user-avatar"
                />

                <div className="sm:hidden lg:block">
                  <p className="subtitle-2 capitalize">{user?.name}</p>
                  <p className="caption">{user?.email}</p>
                </div>
              </div>
              <Separator className="mb-4 bg-slate-200/20" />
            </SheetTitle>
            <nav className="mobile-nav">
              <ul className="mobile-nav-list">
                {navItems.map(({ url, name, icon }) => (
                  <Link href={url} key={name} className="lg:w-full">
                    <li className={cn(
                      "mobile-nav-item",
                      pathname === url && "shad-active"
                    )}>
                      <Image
                        src={icon}
                        alt={name}
                        width={24}
                        height={24}
                        className={cn(
                          "nav-icon",
                          pathname === url && "nav-icon-active"
                        )}
                      />
                      <p>{name}</p>
                    </li>
                  </Link>
                ))}
              </ul>

            </nav>

            <Separator className="mb-4 bg-slate-200/20" />

            <div className="flex flex-col justify-between gap-5 pb-5">
              <FileUploader/>

              <form action={logout}>
                <Button type="submit" className="mobile-sign-out-button">
                  <LogOut size={24} />
                  <p>Logout</p>
                </Button>
              </form>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default MobileNavigation