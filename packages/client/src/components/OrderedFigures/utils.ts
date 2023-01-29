import { Figure } from "@/graphql-types";

export const getMonthlySums = (figures: Figure[]) => {
  const monthlySums: Partial<Record<number, Record<number, number>>> = {};
  figures?.reduce((acc, figure) => {
    if (!figure) {
      return acc;
    }
    const date = new Date(figure.releaseDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const accYear = acc[year] ?? {};

    if (!accYear[month]) {
      accYear[month] = 0;
    }
    accYear[month] += figure.price;
    acc[year] = accYear;
    return acc;
  }, monthlySums);
  // fill empty months with 0
  Object.keys(monthlySums).forEach((year) => {
    const monthlySumsYear = monthlySums[parseInt(year)] ?? {};
    for (let i = 1; i <= 12; i++) {
      if (monthlySumsYear[i] === undefined) {
        monthlySumsYear[i] = 0;
      }
    }
  });
  return monthlySums;
};
