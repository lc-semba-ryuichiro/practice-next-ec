/**
 * Checkout Feature - チェックアウトフォーム
 */

"use client";

import { useAtom, useAtomValue } from "jotai";

import { OrderConfirmation } from "./order-confirmation";
import { PaymentForm } from "./payment-form";
import { ShippingAddressForm } from "./shipping-address-form";
import { checkoutStepAtom, shippingAddressAtom, paymentMethodAtom } from "../model/checkout.atoms";

/**
 * チェックアウトフォームコンポーネント
 *
 * ステップに応じて適切なフォームを表示する
 * @returns チェックアウトフォーム要素
 */
export function CheckoutForm(): React.JSX.Element {
  const [step, setStep] = useAtom(checkoutStepAtom);
  const shippingAddress = useAtomValue(shippingAddressAtom);
  const paymentMethod = useAtomValue(paymentMethodAtom);

  const handleShippingComplete = (): void => {
    setStep("payment");
  };

  const handlePaymentComplete = (): void => {
    setStep("confirmation");
  };

  const handleBack = (): void => {
    if (step === "payment") setStep("shipping");
    if (step === "confirmation") setStep("payment");
  };

  return (
    <div>
      {/* ステップインジケーター */}
      <div className="mb-8 flex justify-center gap-4">
        {["shipping", "payment", "confirmation"].map((s, index) => (
          <div
            key={s}
            className={`flex items-center gap-2 ${step === s ? "text-blue-600" : "text-gray-400"}`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border">
              {index + 1}
            </span>
            <span className="hidden sm:inline">
              {s === "shipping" && "配送先"}
              {s === "payment" && "お支払い"}
              {s === "confirmation" && "確認"}
            </span>
          </div>
        ))}
      </div>

      {/* フォーム */}
      {step === "shipping" && <ShippingAddressForm onComplete={handleShippingComplete} />}
      {step === "payment" && (
        <PaymentForm
          onComplete={handlePaymentComplete}
          onBack={handleBack}
        />
      )}
      {step === "confirmation" && shippingAddress && paymentMethod && (
        <OrderConfirmation
          shippingAddress={shippingAddress}
          paymentMethod={paymentMethod}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
