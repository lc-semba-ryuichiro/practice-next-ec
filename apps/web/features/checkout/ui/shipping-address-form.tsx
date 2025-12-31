/**
 * Checkout Feature - 配送先住所フォーム
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@practice-next-ec/ui";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";

import { shippingAddressAtom } from "../model/checkout.atoms";
import { shippingAddressSchema } from "../model/checkout.schemas";

import type { ShippingAddressFormInput } from "../model/checkout.schemas";
import type { Resolver } from "react-hook-form";

interface ShippingAddressFormProps {
  readonly onComplete: () => void;
}

/**
 * 配送先住所フォームコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.onComplete - フォーム完了時のコールバック
 * @returns 配送先住所フォーム要素
 */
export function ShippingAddressForm({
  onComplete,
}: Readonly<ShippingAddressFormProps>): React.JSX.Element {
  const setShippingAddress = useSetAtom(shippingAddressAtom);

  const form = useForm<ShippingAddressFormInput>({
    resolver: zodResolver(shippingAddressSchema) as unknown as Resolver<ShippingAddressFormInput>,
    defaultValues: {
      lastName: "",
      firstName: "",
      postalCode: "",
      prefecture: "",
      city: "",
      address1: "",
      address2: "",
      phone: "",
    },
  });

  const handleSubmit = (data: ShippingAddressFormInput): void => {
    setShippingAddress(data);
    onComplete();
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    void form.handleSubmit(handleSubmit)(event);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >
      <h2 className="text-xl font-bold">配送先住所</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium"
          >
            姓
          </label>
          <input
            id="lastName"
            {...form.register("lastName")}
            className="mt-1 block w-full rounded border p-2"
          />
          {form.formState.errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.lastName.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium"
          >
            名
          </label>
          <input
            id="firstName"
            {...form.register("firstName")}
            className="mt-1 block w-full rounded border p-2"
          />
          {form.formState.errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{form.formState.errors.firstName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="postalCode"
          className="block text-sm font-medium"
        >
          郵便番号
        </label>
        <input
          id="postalCode"
          {...form.register("postalCode")}
          placeholder="123-4567"
          className="mt-1 block w-full rounded border p-2"
        />
        {form.formState.errors.postalCode && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.postalCode.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="prefecture"
          className="block text-sm font-medium"
        >
          都道府県
        </label>
        <input
          id="prefecture"
          {...form.register("prefecture")}
          className="mt-1 block w-full rounded border p-2"
        />
        {form.formState.errors.prefecture && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.prefecture.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium"
        >
          市区町村
        </label>
        <input
          id="city"
          {...form.register("city")}
          className="mt-1 block w-full rounded border p-2"
        />
        {form.formState.errors.city && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.city.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="address1"
          className="block text-sm font-medium"
        >
          住所
        </label>
        <input
          id="address1"
          {...form.register("address1")}
          className="mt-1 block w-full rounded border p-2"
        />
        {form.formState.errors.address1 && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.address1.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="address2"
          className="block text-sm font-medium"
        >
          建物名・部屋番号
        </label>
        <input
          id="address2"
          {...form.register("address2")}
          className="mt-1 block w-full rounded border p-2"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium"
        >
          電話番号
        </label>
        <input
          id="phone"
          {...form.register("phone")}
          placeholder="090-1234-5678"
          className="mt-1 block w-full rounded border p-2"
        />
        {form.formState.errors.phone && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.phone.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
      >
        次へ
      </Button>
    </form>
  );
}
