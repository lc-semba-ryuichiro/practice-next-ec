/**
 * Auth Feature - ログインフォーム
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@practice-next-ec/ui";
import { useForm } from "react-hook-form";

import { useLogin } from "../api/use-login";
import { loginSchema } from "../model/auth.schemas";

import type { LoginFormInput } from "../model/auth.schemas";
import type { Resolver } from "react-hook-form";

interface LoginFormProps {
  readonly onSuccess?: () => void;
}

/**
 * ログインフォームコンポーネント
 * @param props - コンポーネントプロパティ
 * @param props.onSuccess - ログイン成功時のコールバック
 * @returns ログインフォーム要素
 */
export function LoginForm({ onSuccess }: Readonly<LoginFormProps>): React.JSX.Element {
  const { mutate: login, isPending: isLoading, error } = useLogin();

  const form = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema) as unknown as Resolver<LoginFormInput>,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: LoginFormInput): void => {
    login(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
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

      {error && <p className="text-sm text-red-600">{error.message}</p>}

      <Button type="submit">{isLoading ? "ログイン中..." : "ログイン"}</Button>
    </form>
  );
}
