/**
 * Checkout Feature - Jotai Atoms
 */

import { atom } from "jotai";

import type { CheckoutStep, PaymentMethod, ShippingAddress } from "./checkout.types";

/**
 * チェックアウトステップを管理する atom
 */
export const checkoutStepAtom = atom<CheckoutStep>("shipping");

/**
 * 配送先住所を管理する atom
 */
export const shippingAddressAtom = atom<ShippingAddress | null>(null);

/**
 * 支払い方法を管理する atom
 */
export const paymentMethodAtom = atom<PaymentMethod | null>(null);
