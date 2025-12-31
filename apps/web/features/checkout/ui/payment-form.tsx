/**
 * Checkout Feature - 支払いフォーム
 */

"use client";

import { useState } from "react";

import { Button } from "@practice-next-ec/ui";
import { useSetAtom } from "jotai";

import { paymentMethodAtom } from "../model/checkout.atoms";

import type { PaymentMethod } from "../model/checkout.types";

interface PaymentFormProps {
  readonly onComplete: () => void;
  readonly onBack: () => void;
}

/**
 * 支払いフォームコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.onComplete - フォーム完了時のコールバック
 * @param props.onBack - 戻るボタンのコールバック
 * @returns 支払いフォーム要素
 */
export function PaymentForm({ onComplete, onBack }: Readonly<PaymentFormProps>): React.JSX.Element {
  const setPaymentMethod = useSetAtom(paymentMethodAtom);
  const [paymentType, setPaymentType] = useState<PaymentMethod["type"]>("credit_card");

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    setPaymentMethod({ type: paymentType });
    onComplete();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h2 className="text-xl font-bold">お支払い方法</h2>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="paymentType"
            value="credit_card"
            checked={paymentType === "credit_card"}
            onChange={() => {
              setPaymentType("credit_card");
            }}
          />
          クレジットカード
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="paymentType"
            value="convenience_store"
            checked={paymentType === "convenience_store"}
            onChange={() => {
              setPaymentType("convenience_store");
            }}
          />
          コンビニ決済
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="paymentType"
            value="bank_transfer"
            checked={paymentType === "bank_transfer"}
            onChange={() => {
              setPaymentType("bank_transfer");
            }}
          />
          銀行振込
        </label>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          戻る
        </Button>
        <Button
          type="submit"
          className="flex-1"
        >
          次へ
        </Button>
      </div>
    </form>
  );
}
