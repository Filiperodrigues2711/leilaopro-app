import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeDollarSign, Car, ClipboardList, Users, Wrench } from 'lucide-react';

const roles = [
  {
    name: 'Vendedor',
    href: '/vendedor/dashboard',
    icon: <Car className="h-8 w-8" />,
    description: 'Solicite avaliações e crie anúncios de leilão.',
  },
  {
    name: 'Avaliador',
    href: '/avaliador/dashboard',
    icon: <ClipboardList className="h-8 w-8" />,
    description: 'Realize avaliações técnicas detalhadas dos veículos.',
  },
  {
    name: 'Precificador',
    href: '/precificador/dashboard',
    icon: <BadgeDollarSign className="h-8 w-8" />,
    description: 'Defina os valores de compra e venda dos veículos.',
  },
  {
    name: 'Gestor',
    href: '/gestor/dashboard',
    icon: <Users className="h-8 w-8" />,
    description: 'Acesse todas as informações e gerencie a plataforma.',
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Wrench className="h-12 w-12 text-primary" />
          <h1 className="font-headline text-5xl font-bold ml-4 text-foreground">LeilãoPro</h1>
        </div>
        <p className="text-muted-foreground text-lg">Selecione seu perfil para começar</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {roles.map((role) => (
          <Link href={role.href} key={role.name} className="group">
            <Card className="h-full hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium font-headline">{role.name}</CardTitle>
                <div className="text-primary">{role.icon}</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <footer className="mt-16 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} LeilãoPro. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
