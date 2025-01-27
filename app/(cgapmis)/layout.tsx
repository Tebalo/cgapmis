import Link from 'next/link';
import {
  BarChart,
  ClipboardList,
  FileText,
  Home,
  PanelLeft,
  PieChart,
  Settings,
  Target,
  UserCog,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import Image from "next/image"
import { Toaster } from "@/components/ui/toaster"
import { NavItem } from './nav-item';
import { SearchInput } from './search';
import Providers from './providers';
import { User } from './user';
import React from 'react';
import DashboardBreadcrumb from './breadcrumb';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            <DashboardBreadcrumb />
            <SearchInput />
            <User />
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
          <Toaster />
        </div>
      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/home"
          className="group flex h-14 w-14 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-14 md:w-14 md:text-base"
        >
          <div className="w-40 h-40 items-center justify-center">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={120} 
              height={120} 
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="sr-only">PEEPA</span>
        </Link>
 
        <NavItem href="/home" label="Home">
          <Home className="h-5 w-5" />
        </NavItem>
 
        <NavItem href="/monitoring" label="Performance Monitoring">
          <BarChart className="h-5 w-5" />
        </NavItem>
 
        <NavItem href="/vacancies" label="Vacancies">
          <ClipboardList className="h-5 w-5" />
        </NavItem>
 
        <NavItem href="/applications" label="Applications">
          <FileText className="h-5 w-5" />
        </NavItem>
 
        <NavItem href="/performance" label="KPIs">
          <Target className="h-5 w-5" />
        </NavItem>

        <NavItem href="/users" label="Users">
          <UserCog className="h-5 w-5" />
        </NavItem>
        
        <NavItem href="/analytics" label="Analytics">
          <PieChart className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
 }

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/home"
            className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:text-base"
          >
            <div className="w-40 h-40 items-center justify-center">
              <Image
                src="/logo-peepa.png"
                alt="Logo"
                width={120} 
                height={120} 
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="sr-only">PEEPA</span>
          </Link>

          <Link
            href="/home"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>

          <Link
            href="/monitoring"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <BarChart className="h-5 w-5" />
            Performance Monitoring
          </Link>

          <Link
            href="/vacancies"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ClipboardList className="h-5 w-5" />
            Vacancies
          </Link>

          <Link
            href="/applications"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <FileText className="h-5 w-5" />
            Applications
          </Link>

          <Link
            href="/performance"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Target className="h-5 w-5" />
            KPIs
          </Link>
          <Link
            href="/users"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <UserCog className="h-5 w-5" />
            Users
          </Link>
          
          <Link
            href="/analytics"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <PieChart className="h-5 w-5" />
            Analytics
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}