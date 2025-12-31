/**
 * Auth Feature - 登録フォーム
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@practice-next-ec/ui";
import { useForm } from "react-hook-form";

import { useRegister } from "../api/use-register";
import { registerSchema } from "../model/auth.schemas";

import type { RegisterFormInput } from "../model/auth.schemas";
import type { Resolver } from "react-hook-form";

interface RegisterFormProps {
  readonly onSuccess?: () => void;
}

/**
 * 登録フォームコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.onSuccess - 登録成功時のコールバック
 * @returns 登録フォーム要素
 */
export function RegisterForm({ onSuccess }: Readonly<RegisterFormProps>): React.JSX.Element {
  const { mutate: register, isPending: isLoading, error } = useRegister();

  const form = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema) as unknown as Resolver<RegisterFormInput>,
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    },
  });

  const handleSubmit = (data: RegisterFormInput): void => {
    register(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    void form.handleSubmit(handleSubmit)(event);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium"
        >
          名前
        </label>
        <input
          id="name"
          type="text"
          {...form.register("name")}
          className="mt-1 block w-full rounded border p-2"
        />
        {form.formState.errors.name && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium"
        >
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          {...form.register("email")}
          className="mt-1 block w-full rounded border p-2"
        />
        {form.formState.errors.email && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium"
        >
          パスワード
        </label>
        <input
          id="password"
          type="password"
          {...form.register("password")}
          className="mt-1 block w-full rounded border p-2"
        />
        {form.formState.errors.password && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.password.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="passwordConfirm"
          className="block text-sm font-medium"
        >
          パスワード（確認）
        </label>
        <input
          id="passwordConfirm"
          type="password"
          {...form.register("passwordConfirm")}
          className="mt-1 block w-full rounded border p-2"
        />
        {form.formState.errors.passwordConfirm && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.passwordConfirm.message}
          </p>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error.message}</p>}

      <Button type="submit">{isLoading ? "登録中..." : "登録"}</Button>
    </form>
  );
}
