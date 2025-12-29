/**
 * Products Feature - Jotai Atoms
 */

import { atom } from "jotai";

import type { ProductFilters } from "./products.types";

/**
 * 商品フィルター状態を管理する atom
 */
export const productFiltersAtom = atom<ProductFilters>({});
