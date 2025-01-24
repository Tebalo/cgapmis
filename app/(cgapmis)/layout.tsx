import Link from 'next/link';
import {
  // BookOpen,
  // Cloud,
  Home,
  LineChart,
  PanelLeft,
  Settings,
  // Store,
  // Trees,
  // Users,
  // Users2,
  // Warehouse, Map,
  // Sprout
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
        {/* <Analytics /> */}
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
          className="group flex h-14 w-14 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-14 md:w-14 md:text-base"
        >
            {/* <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" /> */}
            <div className="w-40 h-40 items-center justify-center">
                <Image
                src="/moalogo.png"
                alt="Logo"
                width={120} 
                height={120} 
                className="w-full h-full object-contain"
                priority
                />
            </div>
          <span className="sr-only">Acme Inc</span>
        </Link>

        <NavItem href="/home" label="Home">
          <Home className="h-5 w-5" />
        </NavItem>

        {/* <NavItem href="/farm" label="Farm">
          <Trees className="h-5 w-5" />
        </NavItem>

        <NavItem href="/AI" label="Farm Analyzer">
          <Sprout className="h-5 w-5" />
        </NavItem>

        <NavItem href="/geography" label="Geography">
          <Map className="h-5 w-5" />
        </NavItem>
        
        <NavItem href="/marketplace" label="Marketplace">
          <Store className="h-5 w-5" />
        </NavItem>

        <NavItem href="/assets?offset=0" label="Assets">
          <Warehouse className="h-5 w-5" />
        </NavItem>

        <NavItem href="/weather" label="Weather">
          <Cloud className="h-5 w-5" />
        </NavItem>

        <NavItem href="/social" label="Social">
          <Users2 className="h-5 w-5" />
        </NavItem>

        <NavItem href="/knowledge" label="Knowledge Articles">
          <BookOpen className="h-5 w-5" />
        </NavItem> */}

        <NavItem href="/analytics" label="Analytics">
          <LineChart className="h-5 w-5" />
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
            className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <div className="w-40 h-40 items-center justify-center">
              <Image
                src="/moalogo.png"
                alt="Logo"
                width={120} 
                height={120} 
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="sr-only">MOA</span>
          </Link>
          <Link
          href="/home"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
          <Home className="h-5 w-5" />
          Home
          </Link>

          {/* <Link
          href="/farm"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
          <Trees className="h-5 w-5" />
          Farm
          </Link>

          <Link
          href="/AI"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
          <Sprout  className="h-5 w-5" />
          Farm Analyzer
          </Link>

          <Link
          href="/geography"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
          <Map className="h-5 w-5" />
          Geography
          </Link>

          <Link
          href="/marketplace"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
          <Store className="h-5 w-5" />
          Marketplace
          </Link>

          <Link
          href="/assets?offset=0"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
          <Warehouse className="h-5 w-5" />
          Assets
          </Link>

          <Link
          href="/weather"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
          <Cloud className="h-5 w-5" />
          Weather
          </Link>

          <Link
          href="/social"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
          <Users className="h-5 w-5" />
          Social
          </Link>

          <Link
          href="/knowledge"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
          <BookOpen className="h-5 w-5" />
          Knowledge Articles
          </Link>

          <Link
          href="/analytics"
          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
          <LineChart className="h-5 w-5" />
          Analytics
          </Link> */}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

// function DashboardBreadcrumb(){
//   const pathname = usePathname();
//   const paths = pathname.split("/").filter(Boolean);

//   return (
//     <Breadcrumb className='hidden md:flex'>
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <Link href={"/"}>Dashboard</Link>
//         </BreadcrumbItem>

//         {paths.map((path, index) => {
//         const href = `/${paths.slice(0, index + 1).join('/')}`;
//         const isLast = index === paths.length - 1;
//         return (
//           <React.Fragment key={path}>
//               <BreadcrumbSeparator>
//                 <BreadcrumbItem>
//                   {isLast ? (
//                     <BreadcrumbPage>
//                       {path.charAt(0).toUpperCase() + path.slice(1)}
//                     </BreadcrumbPage>
//                   ):(
//                     <BreadcrumbLink asChild>
//                       <Link href={href}>
//                         {path.charAt(0).toUpperCase() + path.slice(1)}
//                       </Link>
//                     </BreadcrumbLink>
//                   )}
//                 </BreadcrumbItem>
//               </BreadcrumbSeparator>
//           </React.Fragment>
//         );
//         })}
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }

// function DashboardBreadcrumb() {
//   return (
//     <Breadcrumb className="hidden md:flex">
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href="/home">Dashboard</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href="/assets">Assets</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbPage>All Assets</BreadcrumbPage>
//         </BreadcrumbItem>
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }
