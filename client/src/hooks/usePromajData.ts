import { useEffect, useState } from 'react';

export interface PromajData {
  total_participantes: number;
  distribuicao_sexo: Record<string, number>;
  idade_media: number;
  idade_minima: number;
  idade_maxima: number;
  distribuicao_idade: Record<string, number>;
  distribuicao_escolaridade: Record<string, number>;
  distribuicao_cras: Record<string, number>;
  top_5_bairros: Record<string, number>;
  distribuicao_lotacao: Record<string, number>;
  sexo_por_lotacao: Record<string, Record<string, number>>;
  sexo_por_idade: Record<string, Record<string, number>>;
}

export function usePromajData() {
  const [data, setData] = useState<PromajData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/promaj_dashboard_data.json');
        if (!response.ok) {
          throw new Error('Erro ao carregar dados do PROMAJ');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
