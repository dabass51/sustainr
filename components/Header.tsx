'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import {Button} from "@/components/ui/button"

import { useSession, signOut, signIn } from 'next-auth/react'
import { usePathname } from 'next/navigation';
import { useTheme } from "next-themes"

import {ModeToggle} from '@/components/ModeToggle'

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, status } = useSession()
  const pathname = usePathname();
  const router = useRouter();
  
  const { resolvedTheme } = useTheme();

  return (
    <div className="px-6 py-3 md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center">
            <div>
                <Link href="/">
                    { resolvedTheme === 'dark'
                        ? 
                        <Image
                            src="/logo-dark.png"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100px', height: 'auto' }}
                            alt="bikefittr.com"
                        />
                        : <Image
                            src="/logo.png"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: '100px', height: 'auto' }}
                            alt="bikefittr.com"
                        />
                    }
                </Link>
            </div>
            
            <div className="flex md:hidden">
                <Button 
                    variant="outline"
                    aria-label="toggle menu"
                    onClick={() => setIsOpen(!isOpen)}>
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                        <path fillRule="evenodd" d="M4 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm1 5a1 1 0 100 2h14a1 1 0 100-2H5z"></path>
                    </svg>
                </Button>
            </div>
        </div>

        <nav className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
            { pathname === '/' && (
                <>
                    <Link href="#anker-1" className="text-muted-foreground hover:text-gray-300 transition-colors duration-200 transform px-6 py-3 rounded-md">Learn more</Link>
                    <Link href="#anker-2" className="text-muted-foreground hover:text-gray-300 transition-colors duration-200 transform px-6 py-3 rounded-md">Why</Link>
                </>
            )}
            {/*
            <Link href="/blog" className="text-muted-foreground hover:text-gray-300 transition-colors duration-200 transform px-6 py-3 rounded-md">Blog</Link>    
            */}
            {!session && (
                <>
                    <Link 
                        href="#" className="text-muted-foreground hover:text-gray-300 transition-colors duration-200 transform px-6 py-3 rounded-md"
                        onClick={() => {
                            signIn('email', { undefined, callbackUrl: '/dashboard?login=success' })
                        }}
                    >
                        Signin
                    </Link>
                </>
            )}
            {session && (
                <>
                    <Link href="/dashboard" className="text-muted-foreground hover:text-gray-300 transition-colors duration-200 transform px-6 py-3 rounded-md">
                        Dashboard
                    </Link>
                    <Link
                        className="text-muted-foreground hover:text-gray-300 transition-colors duration-200 transform px-6 py-3 rounded-md"
                        href="#"
                        onClick={() => {
                            signOut({ callbackUrl: '/?logout=success' });
                        }}
                    >
                        logout
                    </Link>
                </>
            )}

            <ModeToggle></ModeToggle>

        </nav>
    </div>
  );
}

export default Header;
