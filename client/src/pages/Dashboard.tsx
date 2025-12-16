import { usePromajData } from "@/hooks/usePromajData";
import { KPICard } from "@/components/KPICard";
import { SexDistributionChart } from "@/components/SexDistributionChart";
import { AgeDistributionChart } from "@/components/AgeDistributionChart";
import { ScholarshipChart } from "@/components/ScholarshipChart";
import { CRASDistributionChart } from "@/components/CRASDistributionChart";
import { AllocationChart } from "@/components/AllocationChart";
import { SexAllocationChart } from "@/components/SexAllocationChart";
import { Users, Briefcase, BookOpen, MapPin, TrendingUp } from "lucide-react";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { data, loading, error } = usePromajData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando dados do PROMAJ...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive font-semibold">
            Erro ao carregar dados
          </p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fixed bg-[url(/images/background.png)] bg-cover bg-no-repeat **bg-top** bg-black">
      {/* <div className="fixed bg-black opacity-10"></div> */}
      {/* Header */}
      <header className="h-full w-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 border border-gray-100 shadow-xl">
        <div className="container py-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground text-white">
              Perfil Beneficiários PROMAJ (2025)
            </h1>
          </div>
          <p className="text-muted-foreground text-sm text-white">
            Perfil dos Beneficiários do Programa de Oportunidade de Primeiro
            Emprego e Capacitação de Jovens
          </p>
          <br />
          <a
            className="font-bold text-foreground mb-4 text-white mt-5 text-center"
            href="https://dados.teresopolis.rj.gov.br/dataset/programa-municipal-de-atendimento-ao-jovem-novo-promaj-assistencia/resource/5302b1d2-2235-4610-afd3-123b83a851e1"
          >
            Dados Abertos Compilados - Clique Aqui 🗎
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* KPI Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-white text-center">
            Indicadores Principais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <KPICard
              title="Total de Beneficiários"
              value={data.total_participantes}
              icon={Users}
              description="Jovens selecionados no programa"
            />
            <KPICard
              title="Idade Média"
              value={`${data.idade_media} anos`}
              icon={TrendingUp}
              description={`Entre ${data.idade_minima} e ${data.idade_maxima} anos`}
            />
            <KPICard
              title="Público Masculino"
              value={data.distribuicao_sexo.Masculino}
              icon={Users}
              description={`${((data.distribuicao_sexo.Masculino / data.total_participantes) * 100).toFixed(1)}% do total`}
            />
            <KPICard
              title="Público Feminino"
              value={data.distribuicao_sexo.Feminino}
              icon={Users}
              description={`${((data.distribuicao_sexo.Feminino / data.total_participantes) * 100).toFixed(1)}% do total`}
            />
            <KPICard
              title="Áreas de Atuação"
              value={Object.keys(data.distribuicao_lotacao).length}
              icon={Briefcase}
              description="Estruturas Públicas"
            />
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-white text-center">
            Análise Demográfica
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SexDistributionChart data={data.distribuicao_sexo} />
            <AgeDistributionChart data={data.sexo_por_idade} />
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-white text-center">
            Perfil Educacional
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <ScholarshipChart data={data.distribuicao_escolaridade} />
          </div>
        </section>

        {/* Geographic Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-white text-center">
            Cobertura Territorial
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <CRASDistributionChart data={data.distribuicao_cras} />
          </div>
        </section>

        {/* Allocation Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-white text-center">
            Alocação Profissional
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AllocationChart data={data.distribuicao_lotacao} />
            <SexAllocationChart data={data.sexo_por_lotacao} />
          </div>
        </section>

        {/* Summary Section */}
        <section className="mb-12 p-6 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-100 border border-gray-100">
          <h2 className="text-xl font-bold text-foreground mb-4 text-white text-center">
            Resumo Executivo
          </h2>
          <div className="grid grid-cols-1  gap-6 text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-2 text-white">
                Perfil Educacional
              </p>
              <p className="text-white">
                A maioria dos beneficiários apresenta Ensino Médio Incompleto
                (44), seguido por Ensino Médio Completo (34). Esse cenário
                evidencia uma lacuna significativa na formação educacional, que
                pode limitar o acesso a melhores oportunidades de trabalho e
                progressão profissional. Diante disso, torna-se essencial
                estimular a continuidade dos estudos, seja por meio da conclusão
                do Ensino Médio, seja pela entrada em cursos técnicos e
                superiores. O incentivo à educação formal não apenas amplia as
                perspectivas de empregabilidade, mas também fortalece a
                autonomia e a capacidade crítica dos beneficiários. Além disso,
                políticas e programas de apoio ao ingresso no ensino superior —
                como bolsas de estudo, parcerias com universidades e cursos de
                qualificação — podem ser estratégicos para transformar esse
                perfil educacional em um diferencial competitivo
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2 text-white">
                Distribuição Geográfica
              </p>
              <p className="text-white">
                O programa atende {Object.keys(data.distribuicao_cras).length}{" "}
                CRAS diferentes, com maior concentração em CRAS ALTO (
                {data.distribuicao_cras["CRAS ALTO"]} beneficiários), seguido
                por CRAS SÃO PEDRO ({data.distribuicao_cras["CRAS SÃO PEDRO"]}{" "}
                beneficiários).
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2 text-white">
                Alocação Profissional
              </p>
              <p className="text-white">
                A maioria dos beneficiários estão alocados no Estacionamento
                Rotativo ({data.distribuicao_lotacao["Estacionamento Rotativo"]}{" "}
                beneficiários), com distribuição complementar em{" "}
                {Object.keys(data.distribuicao_lotacao).length - 1} outras áreas
                da administração pública.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2 text-white">
                Equilíbrio de Gênero
              </p>
              <p className="text-white">
                O programa mantém uma distribuição de{" "}
                {(
                  (data.distribuicao_sexo.Masculino /
                    data.total_participantes) *
                  100
                ).toFixed(1)}
                % de beneficiários masculinos e{" "}
                {(
                  (data.distribuicao_sexo.Feminino / data.total_participantes) *
                  100
                ).toFixed(1)}
                % femininos, promovendo inclusão e oportunidades equitativas.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Dashboard PROMAJ © 2025 - Prefeitura Municipal de Teresópolis</p>
          <p className="text-xs mt-2">
            Dados mantidos e atualizados pela Secretaria Municipal de Ciência e
            Tecnologia - Departamento de Governança de Dados
          </p>
        </div>
      </footer>
    </div>
  );
}
