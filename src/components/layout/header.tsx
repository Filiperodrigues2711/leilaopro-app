'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ChevronDown, LogOut, PanelLeft, Wrench } from 'lucide-react';
import { ROLES } from '@/lib/data';
import type { UserRole } from '@/lib/types';

export default function AppHeader({ role }: { role: string }) {
  const params = useParams();
  const currentRole = ROLES[role as UserRole] || 'Usuário';
  const initial = currentRole.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
        <div className="md:hidden">
          <SidebarTrigger variant="outline" size="icon">
            <>
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </>
          </SidebarTrigger>
        </div>

      <div className="flex items-center gap-2 text-lg font-semibold md:text-base">
        <Wrench className="h-6 w-6 text-primary" />
        <span className="font-headline text-xl text-foreground">LeilãoPro V2</span>
      </div>
      
      <div className="flex w-full items-center justify-end gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://avatar.vercel.sh/${role}.png`} alt={currentRole} />
                <AvatarFallback>{initial}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">{currentRole}</span>
              <ChevronDown className="h-4 w-4 hidden sm:inline" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">Mudar Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
