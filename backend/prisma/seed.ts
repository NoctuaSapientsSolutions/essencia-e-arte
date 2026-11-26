import { PrismaClient } from "@prisma/client";
import { fragranceFamilyFromApi } from "../src/lib/fragranceFamily.js";
import { statusForQuantity } from "../src/lib/stockStatus.js";

const prisma = new PrismaClient();

const categories = [
  { id: "cat-essencias", slug: "essencias", name: "Essências", description: "Essências aromáticas para velas, difusores, sprays e perfumes.", kind: "raw" as const },
  { id: "cat-frascos", slug: "frascos-e-vidrarias", name: "Frascos e Vidrarias", description: "Frascos de difusor, spray, perfume e recipientes para vela.", kind: "raw" as const },
  { id: "cat-bases", slug: "bases-e-insumos", name: "Bases e Insumos", description: "Bases, ceras, solventes e insumos de produção.", kind: "raw" as const },
  { id: "cat-acessorios", slug: "velas-e-acessorios", name: "Velas e Acessórios", description: "Varetas, tampas, pavios, pumps e acabamentos.", kind: "raw" as const },
  { id: "cat-prontos", slug: "produtos-prontos", name: "Produtos Prontos", description: "Difusores, sprays, velas e perfumes prontos para uso.", kind: "finished" as const },
  { id: "cat-kits", slug: "kits-para-comecar", name: "Kits para Começar", description: "Kits com tudo o que você precisa para a primeira criação.", kind: "kit" as const },
];

const img = (src: string, alt: string) => ({ src, alt, width: 800, height: 800 });

const products = [
  {
    id: "prod-essencia-bamboo",
    slug: "essencia-bamboo",
    name: "Essência Bamboo",
    kind: "raw" as const,
    categoryId: "cat-essencias",
    shortDescription: "Verde, limpa e levemente amadeirada.",
    description: "Essência de bambu com notas verdes e frescas. Versátil para difusores e sprays de ambiente.",
    images: [img("/mocks/essencia-bamboo.jpg", "Frasco de Essência Bamboo")],
    variants: [
      { id: "var-bamboo-30", sku: "EA-BMB-30", label: "30 ml", attributes: { tamanho: "30 ml" }, priceCents: 2990, quantity: 48 },
      { id: "var-bamboo-100", sku: "EA-BMB-100", label: "100 ml", attributes: { tamanho: "100 ml" }, priceCents: 7990, quantity: 3 },
      { id: "var-bamboo-500", sku: "EA-BMB-500", label: "500 ml", attributes: { tamanho: "500 ml" }, priceCents: 29900, quantity: 0 },
    ],
    badges: ["mais vendido"],
    fragrance: {
      family: "herbal",
      notesTop: ["bambu", "folha verde"],
      notesHeart: ["chá verde"],
      notesBase: ["madeira clara"],
      intensity: 3,
      applications: ["difusor", "spray de ambiente", "vela"],
      recommendedUsage: "10% a 15% na base",
    },
    createdAt: "2026-09-15T10:00:00-03:00",
    ratingAverage: 4.8,
    ratingCount: 132,
  },
  {
    id: "prod-essencia-cha-branco",
    slug: "essencia-cha-branco",
    name: "Essência Chá Branco",
    kind: "raw" as const,
    categoryId: "cat-essencias",
    shortDescription: "Delicada, floral e limpa.",
    description: "Notas suaves de chá branco e flores brancas. Ideal para ambientes leves.",
    images: [img("/mocks/essencia-cha-branco.jpg", "Frasco de Essência Chá Branco")],
    variants: [
      { id: "var-cha-30", sku: "EA-CHB-30", label: "30 ml", attributes: { tamanho: "30 ml" }, priceCents: 3290, quantity: 22 },
      { id: "var-cha-100", sku: "EA-CHB-100", label: "100 ml", attributes: { tamanho: "100 ml" }, priceCents: 8490, quantity: 15 },
    ],
    badges: ["novidade"],
    fragrance: {
      family: "floral",
      notesTop: ["chá branco"],
      notesHeart: ["flor de laranjeira"],
      notesBase: ["almíscar"],
      intensity: 2,
      applications: ["perfume", "spray de ambiente", "vela"],
      recommendedUsage: "8% a 12% na base",
    },
    createdAt: "2026-11-02T10:00:00-03:00",
    ratingAverage: 4.6,
    ratingCount: 41,
  },
  {
    id: "prod-essencia-baunilha",
    slug: "essencia-baunilha",
    name: "Essência Baunilha",
    kind: "raw" as const,
    categoryId: "cat-essencias",
    shortDescription: "Doce, cremosa e acolhedora.",
    description: "Baunilha de Madagascar com fundo cremoso. Muito procurada para velas aromáticas.",
    images: [img("/mocks/essencia-baunilha.jpg", "Frasco de Essência Baunilha")],
    variants: [
      { id: "var-baunilha-30", sku: "EA-BAU-30", label: "30 ml", attributes: { tamanho: "30 ml" }, priceCents: 2790, quantity: 90 },
      { id: "var-baunilha-100", sku: "EA-BAU-100", label: "100 ml", attributes: { tamanho: "100 ml" }, priceCents: 7490, quantity: 34 },
      { id: "var-baunilha-500", sku: "EA-BAU-500", label: "500 ml", attributes: { tamanho: "500 ml" }, priceCents: 27900, quantity: 6 },
    ],
    badges: ["mais vendido", "para começar"],
    fragrance: {
      family: "doce",
      notesTop: ["bergamota"],
      notesHeart: ["baunilha"],
      notesBase: ["âmbar", "sândalo"],
      intensity: 4,
      applications: ["vela", "difusor", "perfume"],
      recommendedUsage: "6% a 10% na base",
    },
    createdAt: "2026-06-20T10:00:00-03:00",
    ratingAverage: 4.9,
    ratingCount: 287,
  },
  {
    id: "prod-essencia-figo-verde",
    slug: "essencia-figo-verde",
    name: "Essência Figo Verde",
    kind: "raw" as const,
    categoryId: "cat-essencias",
    shortDescription: "Frutal, suculenta e verde.",
    description: "Figo verde com folhas e toque cítrico. Combina bem com sprays e tecidos.",
    images: [img("/mocks/essencia-figo-verde.jpg", "Frasco de Essência Figo Verde")],
    variants: [
      { id: "var-figo-30", sku: "EA-FIG-30", label: "30 ml", attributes: { tamanho: "30 ml" }, priceCents: 3190, quantity: 0 },
      { id: "var-figo-100", sku: "EA-FIG-100", label: "100 ml", attributes: { tamanho: "100 ml" }, priceCents: 8190, quantity: 9 },
    ],
    badges: [],
    fragrance: {
      family: "frutal",
      notesTop: ["figo verde", "limão"],
      notesHeart: ["folha de figueira"],
      notesBase: ["cedro"],
      intensity: 3,
      applications: ["spray para tecidos", "spray de ambiente", "difusor"],
      recommendedUsage: "10% na base",
    },
    createdAt: "2026-04-10T10:00:00-03:00",
    ratingAverage: 4.4,
    ratingCount: 19,
  },
  {
    id: "prod-frasco-quadrado-difusor",
    slug: "frasco-quadrado-para-difusor",
    name: "Frasco Quadrado para Difusor",
    kind: "raw" as const,
    categoryId: "cat-frascos",
    shortDescription: "Vidro transparente, boca larga, 250 ml.",
    description: "Frasco de vidro quadrado para difusor de varetas, com tampa de rosca.",
    images: [img("/mocks/frasco-quadrado.jpg", "Frasco quadrado de vidro para difusor")],
    variants: [
      { id: "var-frasco-250-claro", sku: "FV-QUA-250-CL", label: "250 ml · Transparente", attributes: { tamanho: "250 ml", cor: "transparente" }, priceCents: 1890, quantity: 120 },
      { id: "var-frasco-250-ambar", sku: "FV-QUA-250-AM", label: "250 ml · Âmbar", attributes: { tamanho: "250 ml", cor: "âmbar" }, priceCents: 2090, quantity: 0 },
      { id: "var-frasco-500-claro", sku: "FV-QUA-500-CL", label: "500 ml · Transparente", attributes: { tamanho: "500 ml", cor: "transparente" }, priceCents: 2690, quantity: 40 },
    ],
    badges: [],
    createdAt: "2026-05-05T10:00:00-03:00",
    ratingAverage: 4.7,
    ratingCount: 58,
  },
  {
    id: "prod-frasco-fosco-spray",
    slug: "frasco-fosco-para-spray-de-ambiente",
    name: "Frasco Fosco para Spray de Ambiente",
    kind: "raw" as const,
    categoryId: "cat-frascos",
    shortDescription: "Vidro fosco com gatilho, 100 ml.",
    description: "Frasco fosco com sprayer de gatilho, pronto para aromatizar ambientes.",
    images: [img("/mocks/frasco-fosco-spray.jpg", "Frasco fosco com sprayer")],
    variants: [
      { id: "var-spray-100-verde", sku: "FV-SPR-100-VD", label: "100 ml · Verde", attributes: { tamanho: "100 ml", cor: "verde" }, priceCents: 2490, quantity: 2 },
      { id: "var-spray-100-branco", sku: "FV-SPR-100-BR", label: "100 ml · Branco", attributes: { tamanho: "100 ml", cor: "branco" }, priceCents: 2490, quantity: 55 },
    ],
    badges: ["para começar"],
    createdAt: "2026-07-01T10:00:00-03:00",
    ratingAverage: 4.5,
    ratingCount: 36,
  },
  {
    id: "prod-varetas-fibra",
    slug: "varetas-de-fibra",
    name: "Varetas de Fibra",
    kind: "raw" as const,
    categoryId: "cat-acessorios",
    shortDescription: "Pacote com 10 varetas para difusor.",
    description: "Varetas de fibra natural que absorvem o aroma da base e o espalham pelo ambiente.",
    images: [img("/mocks/varetas-fibra.jpg", "Varetas de fibra para difusor")],
    variants: [
      { id: "var-varetas-10", sku: "AC-VAR-10", label: "Pacote com 10", attributes: { quantidade: "10" }, priceCents: 1490, quantity: 300 },
      { id: "var-varetas-50", sku: "AC-VAR-50", label: "Pacote com 50", attributes: { quantidade: "50" }, priceCents: 5990, quantity: 18 },
    ],
    badges: ["mais vendido"],
    createdAt: "2026-03-18T10:00:00-03:00",
    ratingAverage: 4.9,
    ratingCount: 214,
  },
  {
    id: "prod-base-difusor",
    slug: "base-para-difusor",
    name: "Base para Difusor",
    kind: "raw" as const,
    categoryId: "cat-bases",
    shortDescription: "Base aromática neutra, 1 litro.",
    description: "Base de álcool e água para diluir essências na produção de difusores.",
    images: [img("/mocks/base-difusor.jpg", "Base para difusor, 1 litro")],
    variants: [{ id: "var-base-difusor-1l", sku: "BI-DIF-1L", label: "1 L", attributes: { tamanho: "1 L" }, priceCents: 3990, quantity: 64 }],
    badges: [],
    createdAt: "2026-02-12T10:00:00-03:00",
    ratingAverage: 4.6,
    ratingCount: 77,
  },
  {
    id: "prod-cera-soja",
    slug: "cera-de-soja",
    name: "Cera de Soja",
    kind: "raw" as const,
    categoryId: "cat-bases",
    shortDescription: "Cera de soja para velas aromáticas, 1 kg.",
    description: "Cera vegetal de soja com boa aderência de essência para velas.",
    images: [img("/mocks/cera-soja.jpg", "Cera de soja em flocos")],
    variants: [
      { id: "var-cera-1kg", sku: "BI-CER-1KG", label: "1 kg", attributes: { tamanho: "1 kg" }, priceCents: 4490, quantity: 25 },
      { id: "var-cera-5kg", sku: "BI-CER-5KG", label: "5 kg", attributes: { tamanho: "5 kg" }, priceCents: 19900, quantity: 0 },
    ],
    badges: [],
    createdAt: "2026-01-22T10:00:00-03:00",
    ratingAverage: 4.7,
    ratingCount: 102,
  },
  {
    id: "prod-difusor-botanico",
    slug: "difusor-botanico",
    name: "Difusor Botânico",
    kind: "finished" as const,
    categoryId: "cat-prontos",
    shortDescription: "Difusor pronto com essência Bamboo, 250 ml.",
    description: "Difusor de varetas pronto para uso, com essência Bamboo e acabamento em madeira.",
    images: [img("/mocks/difusor-botanico.jpg", "Difusor Botânico pronto")],
    variants: [
      { id: "var-difusor-bamboo-250", sku: "PR-DIF-BMB-250", label: "250 ml · Bamboo", attributes: { tamanho: "250 ml", aroma: "Bamboo" }, priceCents: 8900, quantity: 12 },
      { id: "var-difusor-baunilha-250", sku: "PR-DIF-BAU-250", label: "250 ml · Baunilha", attributes: { tamanho: "250 ml", aroma: "Baunilha" }, priceCents: 8900, quantity: 4 },
    ],
    badges: ["novidade"],
    createdAt: "2026-10-28T10:00:00-03:00",
    ratingAverage: 4.8,
    ratingCount: 25,
  },
  {
    id: "prod-kit-difusor",
    slug: "kit-inicial-para-difusor",
    name: "Kit Inicial para Difusor",
    kind: "kit" as const,
    categoryId: "cat-kits",
    shortDescription: "Tudo para fazer seus primeiros 250 ml de difusor.",
    description: "Essência Baunilha 30 ml, base 1 L, frasco quadrado 250 ml e 10 varetas de fibra.",
    images: [img("/mocks/kit-difusor.jpg", "Kit inicial para difusor")],
    variants: [{ id: "var-kit-difusor-padrao", sku: "KT-DIF-01", label: "Kit padrão", attributes: { kit: "padrão" }, priceCents: 8990, quantity: 30 }],
    badges: ["para começar"],
    createdAt: "2026-08-08T10:00:00-03:00",
    ratingAverage: 4.9,
    ratingCount: 63,
  },
];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.fragrance.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }

  for (const product of products) {
    const { variants, fragrance, images, ...rest } = product;
    await prisma.product.create({
      data: {
        ...rest,
        createdAt: new Date(product.createdAt),
        images: { create: images.map((image, position) => ({ ...image, position })) },
        variants: {
          create: variants.map((variant) => ({
            id: variant.id,
            sku: variant.sku,
            label: variant.label,
            attributes: variant.attributes,
            priceCents: variant.priceCents,
            stock: {
              create: { quantity: variant.quantity, status: statusForQuantity(variant.quantity) },
            },
          })),
        },
        fragrance: fragrance
          ? {
              create: {
                family: fragranceFamilyFromApi(fragrance.family),
                notesTop: fragrance.notesTop,
                notesHeart: fragrance.notesHeart,
                notesBase: fragrance.notesBase,
                intensity: fragrance.intensity,
                applications: fragrance.applications,
                recommendedUsage: fragrance.recommendedUsage,
              },
            }
          : undefined,
      },
    });
  }

  console.log(`Seed concluído: ${categories.length} categorias, ${products.length} produtos.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
