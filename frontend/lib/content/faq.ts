import type { FaqEntry } from "@/components/ui/FaqAccordion";

export interface FaqGroup {
  title: string;
  items: FaqEntry[];
}

export const faqGroups: FaqGroup[] = [
  {
    title: "Pedidos e entrega",
    items: [
      {
        question: "Quanto tempo leva para meu pedido chegar?",
        answer:
          "O prazo depende da forma de envio escolhida no checkout, calculada a partir do seu CEP. Entregas econômicas costumam levar de 5 a 9 dias úteis; a expressa, de 2 a 4 dias úteis.",
      },
      {
        question: "Vocês enviam para todo o Brasil?",
        answer: "Sim, enviamos para todas as regiões do país. O frete é calculado por CEP diretamente no checkout.",
      },
      {
        question: "Como acompanho meu pedido?",
        answer:
          "Assim que o pedido é confirmado, você recebe o número do pedido por e-mail. As atualizações de envio chegam no mesmo endereço.",
      },
    ],
  },
  {
    title: "Produtos e matérias-primas",
    items: [
      {
        question: "Qual a diferença entre matéria-prima e produto pronto?",
        answer:
          "Matérias-primas (essências, frascos, bases) são para quem produz os próprios itens aromáticos. Produtos prontos já vêm finalizados, prontos para usar ou presentear.",
      },
      {
        question: "As essências são puras ou já vêm diluídas?",
        answer:
          "Cada ficha de produto traz o uso recomendado (percentual de diluição na base) e as aplicações indicadas para aquela essência.",
      },
      {
        question: "Vocês têm kits para quem está começando?",
        answer:
          "Sim. A categoria Kits para Começar reúne combinações com essência, frasco e insumos básicos para a primeira produção.",
      },
    ],
  },
  {
    title: "Pagamento e trocas",
    items: [
      {
        question: "Quais formas de pagamento vocês aceitam?",
        answer: "Pix (com desconto), cartão de crédito em até 3x sem juros e boleto bancário.",
      },
      {
        question: "Posso trocar ou devolver um produto?",
        answer:
          "Sim, aceitamos trocas e devoluções em até 7 dias corridos após o recebimento, desde que o produto esteja lacrado e sem uso. Fale com a gente pelo WhatsApp para iniciar a solicitação.",
      },
    ],
  },
];
