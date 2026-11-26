// Itens de navegação. Os textos e rotas seguem a arquitetura de informação do brief.

export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: "Essências", href: "/categorias/essencias" },
  { label: "Frascos e Vidrarias", href: "/categorias/frascos-e-vidrarias" },
  { label: "Bases e Insumos", href: "/categorias/bases-e-insumos" },
  { label: "Velas e Acessórios", href: "/categorias/velas-e-acessorios" },
  { label: "Produtos Prontos", href: "/categorias/produtos-prontos" },
  { label: "Kits para Começar", href: "/categorias/kits-para-comecar" },
];

// Menu mobile agrupado em "Criar" (matérias-primas) e "Perfumar sua casa" (produtos prontos).
export const mobileNavigationGroups: Array<{ title: string; items: NavItem[] }> = [
  {
    title: "Criar",
    items: [
      { label: "Essências", href: "/categorias/essencias" },
      { label: "Bases e Insumos", href: "/categorias/bases-e-insumos" },
      { label: "Frascos e Vidrarias", href: "/categorias/frascos-e-vidrarias" },
      { label: "Velas e Acessórios", href: "/categorias/velas-e-acessorios" },
    ],
  },
  {
    title: "Perfumar sua casa",
    items: [
      { label: "Difusores", href: "/categorias/produtos-prontos" },
      { label: "Sprays de ambiente", href: "/categorias/produtos-prontos" },
      { label: "Velas aromáticas", href: "/categorias/produtos-prontos" },
      { label: "Kits para Começar", href: "/categorias/kits-para-comecar" },
    ],
  },
  {
    title: "Ajuda",
    items: [
      { label: "Guias", href: "/guias" },
      { label: "Perguntas frequentes", href: "/faq" },
      { label: "Contato", href: "/contato" },
    ],
  },
];

export const utilityLinks = {
  account: "/conta",
  favorites: "/favoritos",
  cart: "/carrinho",
  search: "/busca",
};
