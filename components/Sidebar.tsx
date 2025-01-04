"use client";

import { avatarPlaceholder, navItems } from '@/constants'
import useCurrentUser from '@/hooks/useCurrentUser';
import { cn } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathname = usePathname();
  const user = useCurrentUser();  

  return (
    <aside className='sidebar'>
      {/* <Image
          src="/logo.svg"
          alt="Logo"
          width={80}
          height={40}
          className="hidden h-auto lg:block"
        /> */}

      <Image
        src="/logo.svg"
        alt="Logo"
        width={52}
        height={52}
        className="lg:hidden"
      />

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link href={url} key={name} className="lg:w-full">
              <li className={cn(
                "sidebar-nav-item",
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
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      {/* <Image
        src="/illustration.avif"
        alt="Logo"
        width={206}
        height={118}
        className="w-full"
      /> */}

      <div className="sidebar-user-info">
        <Image src={avatarPlaceholder} alt="Avatar" width={40} height={40} className='sidebar-user-avatar' />

        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{user?.name}</p>
          <p className="caption">{user?.email}</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar