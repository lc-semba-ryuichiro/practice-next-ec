/**
 * Products Feature - 商品フィルター
 */

"use client";

import { useAtom } from "jotai";

import { productFiltersAtom } from "../model/products.atoms";

/**
 * 商品フィルターコンポーネント
 * @returns 商品フィルター要素
 */
export function ProductFilters(): React.JSX.Element {
  const [filters, setFilters] = useAtom(productFiltersAtom);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value;
    const sortBy = value === "" ? undefined : (value as NonNullable<typeof filters.sortBy>);
    setFilters((previous) => ({ ...previous, sortBy }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFilters((previous) => ({ ...previous, searchQuery: event.target.value }));
  };

  return (
    <div className="flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="商品を検索..."
        value={filters.searchQuery ?? ""}
        onChange={handleSearchChange}
        className="rounded border px-4 py-2"
      />
      <select
        value={filters.sortBy ?? ""}
        onChange={handleSortChange}
        className="rounded border px-4 py-2"
      >
        <option value="">並び替え</option>
        <option value="newest">新着順</option>
        <option value="price_asc">価格が安い順</option>
        <option value="price_desc">価格が高い順</option>
        <option value="name_asc">名前順</option>
      </select>
    </div>
  );
}
