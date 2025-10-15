import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { UserRole } from '@/lib/types';

// Interface para definir a estrutura de um Leilão, baseado no nosso planejamento
export interface Auction {
  id: string;
  status: 'ativo' | 'encerrado';
  startValue: number;
  endTime: Timestamp;
  bids: { userId: string; value: number; timestamp: Timestamp }[];
  vehicleInfo: {
    imageUrl: string;
    brand: string;
    model: string;
    version: string;
    yearManufacture: number;
    yearModel: number;
    mileage: number;
  };
}

/**
 * Busca leilões no Firestore com base em um status específico.
 * @param options - Opções de filtro, como o status do leilão.
 * @returns Uma promessa que resolve para um array de leilões.
 */
export async function getAuctions(options: { status: 'ativo' | 'encerrado' }): Promise<Auction[]> {
  try {
    const auctionsRef = collection(db, 'auctions');
    const q = query(auctionsRef, where("status", "==", options.status));

    const querySnapshot = await getDocs(q);
    const auctions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Auction[];

    return auctions;
  } catch (error) {
    console.error("Erro ao buscar leilões:", error);
    return []; // Retorna um array vazio em caso de erro
  }
}
