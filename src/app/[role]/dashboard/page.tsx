import type { UserRole } from '@/lib/types';
import { ROLES, MOCK_EVALUATIONS } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, BarChart, FileSearch } from 'lucide-react';

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  'Solicitada': 'default',
  'Em Andamento': 'secondary',
  'Aguardando Mesa': 'outline',
  'Precificada': 'default',
  'Vendido': 'destructive',
  'Pendente': 'secondary',
};

const EvaluationTable = ({ evaluations, role }: { evaluations: any[], role: UserRole }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Placa</TableHead>
        <TableHead>Veículo</TableHead>
        <TableHead className="hidden md:table-cell">Proprietário</TableHead>
        <TableHead className="hidden md:table-cell">Data</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {evaluations.map((ev) => (
        <TableRow key={ev.id}>
          <TableCell className="font-medium font-code">{ev.vehicleInfo.placa}</TableCell>
          <TableCell>{ev.vehicleInfo.marca} {ev.vehicleInfo.modelo}</TableCell>
          <TableCell className="hidden md:table-cell">{ev.ownerInfo.name}</TableCell>
          <TableCell className="hidden md:table-cell">{new Date(ev.createdAt).toLocaleDateString()}</TableCell>
          <TableCell><Badge variant={statusVariantMap[ev.status]}>{ev.status}</Badge></TableCell>
          <TableCell className="text-right">
            <Button asChild variant="ghost" size="sm">
              <Link href={`/${role}/evaluations/${ev.id}`}>Ver</Link>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

const EvaluatorDashboard = () => {
  const requested = MOCK_EVALUATIONS.filter(e => e.status === 'Solicitada');
  const inProgress = MOCK_EVALUATIONS.filter(e => e.status === 'Em Andamento');
  const done = MOCK_EVALUATIONS.filter(e => ['Aguardando Mesa', 'Precificada', 'Vendido'].includes(e.status));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Dashboard do Avaliador</CardTitle>
        <CardDescription>Gerencie as avaliações de veículos.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="requested">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requested">Solicitadas ({requested.length})</TabsTrigger>
            <TabsTrigger value="inProgress">Em Andamento ({inProgress.length})</TabsTrigger>
            <TabsTrigger value="done">Realizadas ({done.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="requested">
            <EvaluationTable evaluations={requested} role="avaliador" />
          </TabsContent>
          <TabsContent value="inProgress">
            <EvaluationTable evaluations={inProgress} role="avaliador" />
          </TabsContent>
          <TabsContent value="done">
            <EvaluationTable evaluations={done} role="avaliador" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

const PricerDashboard = () => {
    const awaitingPricing = MOCK_EVALUATIONS.filter(e => e.status === 'Aguardando Mesa');
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Mesa de Precificação</CardTitle>
                <CardDescription>Avaliações aguardando definição de preço.</CardDescription>
            </CardHeader>
            <CardContent>
                <EvaluationTable evaluations={awaitingPricing} role="precificador" />
            </CardContent>
        </Card>
    )
}

const SellerDashboard = () => {
    // In a real app, this would be filtered by current user
    const myEvaluations = MOCK_EVALUATIONS.slice(0, 2);
     return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Minhas Avaliações</CardTitle>
                <CardDescription>Acompanhe o status das suas solicitações.</CardDescription>
            </CardHeader>
            <CardContent>
                <EvaluationTable evaluations={myEvaluations} role="vendedor" />
            </CardContent>
        </Card>
    )
}

const ManagerDashboard = () => {
  const totalEvaluations = MOCK_EVALUATIONS.length;
  const activeAuctions = MOCK_EVALUATIONS.filter(e => e.auctionId).length;
  const awaitingPricing = MOCK_EVALUATIONS.filter(e => e.status === 'Aguardando Mesa').length;

  return (
    <div className="space-y-6">
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
            <FileSearch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvaluations}</div>
            <p className="text-xs text-muted-foreground">+2.1% desde o mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leilões Ativos</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAuctions}</div>
            <p className="text-xs text-muted-foreground">+5 desde a semana passada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aguardando Preço</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{awaitingPricing}</div>
            <p className="text-xs text-muted-foreground">Veículos na mesa de preços</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Visão Geral das Avaliações</CardTitle>
            <CardDescription>Lista de todas as avaliações recentes na plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
            <EvaluationTable evaluations={MOCK_EVALUATIONS.slice(0, 5)} role="gestor" />
        </CardContent>
      </Card>
    </div>
  )
}

const DashboardComponents: Record<UserRole, React.ComponentType> = {
  avaliador: EvaluatorDashboard,
  precificador: PricerDashboard,
  vendedor: SellerDashboard,
  gestor: ManagerDashboard,
};

export default function DashboardPage({ params }: { params: { role: UserRole } }) {
  const role = params.role;
  const RoleDashboard = DashboardComponents[role];

  if (!RoleDashboard) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Perfil não encontrado</h1>
        <p>O perfil "{role}" não existe.</p>
      </div>
    );
  }

  return <RoleDashboard />;
}
