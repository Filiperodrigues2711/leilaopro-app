import type { Metadata } from 'next';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/sidebar';
import AppHeader from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'Dashboard - LeilãoPro',
};

export default function RoleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { role: string };
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar role={params.role} />
        <main className="flex-1 flex flex-col">
          <AppHeader role={params.role} />
          <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
