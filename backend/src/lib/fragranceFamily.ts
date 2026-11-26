import { FragranceFamily } from "@prisma/client";

// O enum do Postgres não aceita acento; o contrato da API usa os nomes com acento.
const TO_API: Record<FragranceFamily, string> = {
  floral: "floral",
  citrica: "cítrica",
  amadeirada: "amadeirada",
  frutal: "frutal",
  doce: "doce",
  herbal: "herbal",
  fresca: "fresca",
};

const TO_DB: Record<string, FragranceFamily> = Object.fromEntries(
  Object.entries(TO_API).map(([db, api]) => [api, db as FragranceFamily])
);

export function fragranceFamilyToApi(family: FragranceFamily): string {
  return TO_API[family];
}

export function fragranceFamilyFromApi(value: string): FragranceFamily {
  const family = TO_DB[value];
  if (!family) throw new Error(`Família de fragrância desconhecida: ${value}`);
  return family;
}
