export interface GuideBlock {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  summary: string;
  readingMinutes: number;
  blocks: GuideBlock[];
}

export const guides: Guide[] = [
  {
    slug: "difusor-de-varetas",
    title: "Como fazer um difusor de varetas",
    summary: "Passo a passo para montar um difusor de varetas em casa, da proporção de essência à escolha certa das varetas.",
    readingMinutes: 4,
    blocks: [
      {
        paragraphs: [
          "O difusor de varetas é a forma mais simples de perfumar um ambiente de maneira contínua, sem chama e sem eletricidade. Ele funciona por capilaridade: as varetas absorvem a mistura de base e essência e liberam o aroma aos poucos.",
        ],
      },
      {
        heading: "O que você vai precisar",
        list: [
          "Frasco com gargalo estreito (ajuda a controlar a evaporação)",
          "Base para difusor",
          "Essência aromática da sua preferência",
          "Varetas de fibra ou bambu, de 20 a 30 cm",
        ],
      },
      {
        heading: "Passo a passo",
        list: [
          "Meça a base e a essência seguindo o uso recomendado na ficha do produto escolhido.",
          "Despeje primeiro a base no frasco e, em seguida, a essência.",
          "Feche e agite suavemente por alguns segundos para homogeneizar.",
          "Insira as varetas e aguarde de 2 a 4 horas para o primeiro aroma se espalhar.",
        ],
      },
      {
        heading: "Dicas de quem já fez muito difusor",
        list: [
          "Vire as varetas a cada 3 ou 4 dias para renovar a intensidade do aroma.",
          "Ambientes muito ventilados aceleram a evaporação — normal nesse caso usar mais varetas.",
          "Proteja móveis de madeira com um descanso embaixo do frasco.",
        ],
      },
    ],
  },
  {
    slug: "escolher-essencia",
    title: "Como escolher uma essência",
    summary: "Um guia rápido pelas famílias olfativas para encontrar o aroma certo para cada ambiente e momento.",
    readingMinutes: 5,
    blocks: [
      {
        paragraphs: [
          "Com tantas opções, escolher uma essência pode parecer difícil. O caminho mais fácil é pensar primeiro na família olfativa e depois no ambiente onde ela vai ser usada.",
        ],
      },
      {
        heading: "As famílias olfativas",
        list: [
          "Florais — delicadas e românticas, ótimas para quartos",
          "Cítricas — energizantes, boas para cozinhas e manhãs",
          "Amadeiradas — aconchegantes, combinam com salas e home offices",
          "Frutais — leves e descontraídas, versáteis em qualquer cômodo",
          "Doces — envolventes, ideais para o inverno",
          "Herbais e frescas — limpas e discretas, funcionam bem em banheiros",
        ],
      },
      {
        heading: "Pense no ambiente e na estação",
        paragraphs: [
          "Ambientes pequenos e fechados pedem intensidades mais baixas; salas amplas ou com circulação de ar aceitam aromas mais fortes. No verão, cítricas e frescas costumam agradar mais; no inverno, amadeiradas e doces criam uma atmosfera mais aconchegante.",
        ],
      },
      {
        heading: "Teste a intensidade antes de decidir",
        paragraphs: [
          "Cada ficha de produto traz a intensidade em uma escala de 1 a 5. Se você está começando, prefira algo entre 2 e 3 e um frasco de 30 ml — é mais barato de testar e dá para ajustar a concentração na próxima produção.",
        ],
      },
    ],
  },
  {
    slug: "concentracao",
    title: "Qual concentração utilizar",
    summary: "Como pensar na proporção entre essência e base de acordo com o tipo de produto que você está fazendo.",
    readingMinutes: 3,
    blocks: [
      {
        paragraphs: [
          "A concentração — a proporção de essência em relação à base — é o que define a intensidade final do seu produto. Ela varia conforme o tipo de aplicação, e a referência mais confiável é sempre o uso recomendado indicado na ficha de cada essência.",
        ],
      },
      {
        heading: "Faixas usuais por aplicação",
        list: [
          "Difusor de varetas: costuma concentrar mais, já que a liberação é lenta.",
          "Spray de ambiente: concentração média, para não saturar o ar em poucos borrifos.",
          "Velas aromáticas: a essência é adicionada à cera ainda líquida, em proporção menor.",
        ],
      },
      {
        heading: "Comece conservador",
        paragraphs: [
          "Na dúvida, use a extremidade mais baixa da faixa recomendada e teste o resultado por alguns dias. É mais fácil reforçar o aroma numa próxima leva do que corrigir uma mistura concentrada demais.",
          "Para produtos de contato com a pele, siga rigorosamente o uso recomendado da ficha e, em caso de dúvida, fale com a gente pelo WhatsApp antes de produzir.",
        ],
      },
    ],
  },
  {
    slug: "escolher-frasco",
    title: "Qual frasco escolher",
    summary: "Cada formato de frasco existe por um motivo prático — veja qual combina com o que você quer produzir.",
    readingMinutes: 3,
    blocks: [
      {
        paragraphs: [
          "O frasco certo não é só estético: o formato e o material influenciam diretamente como o seu produto funciona no dia a dia.",
        ],
      },
      {
        heading: "Por tipo de produto",
        list: [
          "Difusores — frascos com gargalo estreito controlam a evaporação e sustentam bem as varetas.",
          "Sprays de ambiente — frascos foscos com válvula spray dosam melhor e protegem a essência da luz.",
          "Perfumes — frascos pequenos, com válvula fina, para aplicação precisa.",
          "Velas — recipientes resistentes ao calor, como vidro âmbar grosso ou copos próprios para vela.",
        ],
      },
      {
        heading: "Vidro âmbar ou fosco?",
        paragraphs: [
          "Vidro âmbar e frascos foscos bloqueiam parte da luz, o que ajuda a preservar a essência por mais tempo. Prefira-os para produtos que vão ficar expostos à luz do sol ou de lâmpadas fortes.",
        ],
      },
    ],
  },
  {
    slug: "materiais-essenciais",
    title: "Materiais essenciais para começar",
    summary: "A lista mínima de itens para sair do zero e produzir suas primeiras essências, sprays e velas.",
    readingMinutes: 3,
    blocks: [
      {
        paragraphs: [
          "Se você está começando agora, não precisa comprar tudo de uma vez. Esta é a base mínima para já produzir seus primeiros itens.",
        ],
      },
      {
        heading: "Para difusores e sprays",
        list: ["1 essência da sua preferência", "Base para difusor ou spray", "Frasco compatível", "Varetas (no caso do difusor)"],
      },
      {
        heading: "Para velas",
        list: ["Cera de soja", "Pavios de algodão", "Copo próprio para vela", "Essência indicada para velas"],
      },
      {
        heading: "Itens de apoio úteis",
        list: ["Balança de precisão, para medir proporções", "Béquer ou jarra de medição", "Etiquetas para identificar os frascos"],
      },
      {
        heading: "Não quer montar sozinho?",
        paragraphs: [
          "A categoria Kits para Começar já reúne essas combinações prontas, com instruções práticas incluídas.",
        ],
      },
    ],
  },
  {
    slug: "calcular-producao",
    title: "Como calcular a produção",
    summary: "Um exemplo numérico simples para transformar a concentração recomendada em quantidades reais de compra.",
    readingMinutes: 4,
    blocks: [
      {
        paragraphs: [
          "Calcular quanto comprar de cada insumo é mais simples do que parece: basta aplicar a concentração recomendada sobre o volume final que você quer produzir.",
        ],
      },
      {
        heading: "A fórmula",
        paragraphs: [
          "Volume de essência = volume final × concentração desejada. O restante do volume final é preenchido com a base.",
        ],
      },
      {
        heading: "Exemplo prático",
        paragraphs: [
          "Digamos que você queira produzir 100 ml de um difusor com concentração de 20%:",
        ],
        list: ["Essência: 100 ml × 20% = 20 ml", "Base: 100 ml − 20 ml = 80 ml"],
      },
      {
        heading: "Produzindo em maior escala",
        paragraphs: [
          "A mesma proporção vale para lotes maiores: para 500 ml na mesma concentração de 20%, use 100 ml de essência e 400 ml de base. Manter a proporção é mais importante do que o volume total.",
        ],
      },
      {
        heading: "Arredonde para cima",
        paragraphs: [
          "Ao comprar os insumos, arredonde a quantidade para cima e considere uma margem de 5 a 10% para perdas no processo de mistura e envase.",
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | null {
  return guides.find((guide) => guide.slug === slug) ?? null;
}
