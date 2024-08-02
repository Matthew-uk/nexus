"use client";
import React from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

const AsideComponents = () => {
  const pathName = usePathname();

  const linkClass = (path: string) =>
    `flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
      pathName === path
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Link
          href='#'
          className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'>
          <Package2 className='h-4 w-4 transition-all group-hover:scale-110' />
          <span className='sr-only'>Nexus Admin</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href='/dashboard' className={linkClass("/admin/dashboard")}>
              <Home className='h-5 w-5' />
              <span className='sr-only'>Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='/orders'
              className={linkClass("/admin/dashboard/orders")}>
              <ShoppingCart className='h-5 w-5' />
              <span className='sr-only'>Orders</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Orders</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='/admin/dashboard/tasks'
              className={linkClass("/admin/dashboard/tasks")}>
              <ClipboardCheck className='h-5 w-5' />
              <span className='sr-only'>Tasks</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Tasks</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='/admin/dashboard/users'
              className={linkClass("/admin/dashboard/users")}>
              <Users2 className='h-5 w-5' />
              <span className='sr-only'>Users</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Users</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='/analytics'
              className={linkClass("/admin/dashboard/analytics")}>
              <LineChart className='h-5 w-5' />
              <span className='sr-only'>Analytics</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Analytics</TooltipContent>
        </Tooltip>
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='/settings'
              className={linkClass("/admin/dashboard/settings")}>
              <Settings className='h-5 w-5' />
              <span className='sr-only'>Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default AsideComponents;
