/**
 * Checkout Feature - Create Order Hook
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import type { Order } from "@/entities/order";
import { cartAtom } from "@/features/cart";

import { createOrder } from "./checkout.api";

import type { CreateOrderRequest } from "../model/checkout.types";
import type { UseMutationResult } from "@tanstack/react-query";

/**
 * 注文を作成する mutation hook
 * @returns TanStack Query mutation
 */
export function useCreateOrder(): UseMutationResult<Order, Error, CreateOrderRequest> {
  const queryClient = useQueryClient();
  const setCart = useSetAtom(cartAtom);

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      // カートをクリア
      setCart({ items: [], updatedAt: Date.now() });
      // 注文履歴を無効化
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
