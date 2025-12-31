import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  describe("レンダリング", () => {
    it("デフォルト props で button 要素としてレンダリングされる", () => {
      // Given: props なしで Button をレンダリング
      render(<Button>ボタン</Button>);

      // When: コンポーネントがマウントされる
      const button = screen.getByRole("button", { name: "ボタン" });

      // Then: role="button" の要素が存在する
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe("BUTTON");
    });

    it("children が正しくレンダリングされる", () => {
      // Given: children を持つ Button
      render(<Button>テストボタン</Button>);

      // When: コンポーネントがマウントされる
      // Then: children テキストが表示される
      expect(screen.getByText("テストボタン")).toBeInTheDocument();
    });

    it("data-slot 属性が button に設定される", () => {
      // Given: Button コンポーネント
      render(<Button>ボタン</Button>);

      // When: コンポーネントがマウントされる
      const button = screen.getByRole("button");

      // Then: data-slot="button" が設定される
      expect(button).toHaveAttribute("data-slot", "button");
    });
  });

  describe("variant prop", () => {
    it.each(["default", "secondary", "outline", "destructive", "ghost", "link"] as const)(
      "variant=%s が指定されたとき data-variant 属性に反映される",
      (variant) => {
        // Given: variant prop が指定された Button
        render(<Button variant={variant}>ボタン</Button>);

        // When: コンポーネントがマウントされる
        const button = screen.getByRole("button");

        // Then: data-variant 属性が variant 値と一致する
        expect(button).toHaveAttribute("data-variant", variant);
      }
    );

    it("variant を指定しない場合、デフォルトで default が設定される", () => {
      // Given: variant を指定しない Button
      render(<Button>ボタン</Button>);

      // When: コンポーネントがマウントされる
      const button = screen.getByRole("button");

      // Then: data-variant="default" が設定される
      expect(button).toHaveAttribute("data-variant", "default");
    });
  });

  describe("size prop", () => {
    it.each(["default", "sm", "lg", "icon", "icon-sm", "icon-lg"] as const)(
      "size=%s が指定されたとき data-size 属性に反映される",
      (size) => {
        // Given: size prop が指定された Button
        render(<Button size={size}>ボタン</Button>);

        // When: コンポーネントがマウントされる
        const button = screen.getByRole("button");

        // Then: data-size 属性が size 値と一致する
        expect(button).toHaveAttribute("data-size", size);
      }
    );

    it("size を指定しない場合、デフォルトで default が設定される", () => {
      // Given: size を指定しない Button
      render(<Button>ボタン</Button>);

      // When: コンポーネントがマウントされる
      const button = screen.getByRole("button");

      // Then: data-size="default" が設定される
      expect(button).toHaveAttribute("data-size", "default");
    });
  });

  describe("asChild prop", () => {
    it("asChild=true のとき子要素の型でレンダリングされる", () => {
      // Given: asChild=true で <a> タグを子に持つ Button
      render(
        <Button asChild>
          <a href="/test">リンクボタン</a>
        </Button>
      );

      // When: コンポーネントがマウントされる
      const link = screen.getByRole("link", { name: "リンクボタン" });

      // Then: <a> タグとしてレンダリングされ href 属性を持つ
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/test");
    });

    it("asChild=true のとき Button のスタイル属性が子要素に適用される", () => {
      // Given: asChild=true で variant と size を指定
      render(
        <Button
          asChild
          variant="secondary"
          size="lg"
        >
          <a href="/test">リンクボタン</a>
        </Button>
      );

      // When: コンポーネントがマウントされる
      const link = screen.getByRole("link");

      // Then: data 属性が子要素に適用される
      expect(link).toHaveAttribute("data-slot", "button");
      expect(link).toHaveAttribute("data-variant", "secondary");
      expect(link).toHaveAttribute("data-size", "lg");
    });
  });

  describe("disabled 状態", () => {
    it("disabled=true のとき button 要素が無効化される", () => {
      // Given: disabled=true の Button
      render(<Button disabled>無効ボタン</Button>);

      // When: コンポーネントがマウントされる
      const button = screen.getByRole("button");

      // Then: disabled 属性が true である
      expect(button).toBeDisabled();
    });

    it("disabled=true のときクリックイベントが発火しない", async () => {
      // Given: disabled=true で onClick ハンドラ付きの Button
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button
          disabled
          onClick={handleClick}
        >
          無効ボタン
        </Button>
      );

      // When: ボタンをクリックする
      const button = screen.getByRole("button");
      await user.click(button);

      // Then: onClick が呼ばれない
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("イベントハンドリング", () => {
    it("クリックすると onClick ハンドラが呼ばれる", async () => {
      // Given: onClick ハンドラ付きの Button
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>クリック</Button>);

      // When: ボタンをクリックする
      const button = screen.getByRole("button");
      await user.click(button);

      // Then: onClick が 1 回呼ばれる
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it("キーボードの Enter キーで onClick が発火する", async () => {
      // Given: onClick ハンドラ付きの Button
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>クリック</Button>);

      // When: ボタンにフォーカスして Enter キーを押す
      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard("{Enter}");

      // Then: onClick が呼ばれる
      expect(handleClick).toHaveBeenCalled();
    });

    it("キーボードの Space キーで onClick が発火する", async () => {
      // Given: onClick ハンドラ付きの Button
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>クリック</Button>);

      // When: ボタンにフォーカスして Space キーを押す
      const button = screen.getByRole("button");
      button.focus();
      await user.keyboard(" ");

      // Then: onClick が呼ばれる
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("className のマージ", () => {
    it("カスタム className がデフォルトクラスとマージされる", () => {
      // Given: className="custom-class" の Button
      render(<Button className="custom-class">ボタン</Button>);

      // When: コンポーネントがマウントされる
      const button = screen.getByRole("button");

      // Then: custom-class とデフォルトクラスの両方を持つ
      expect(button).toHaveClass("custom-class");
      // デフォルトクラスの一部も持っている
      expect(button).toHaveClass("inline-flex");
    });
  });

  describe("type 属性", () => {
    it("type=button を指定するとフォーム送信しない", () => {
      // Given: type="button" の Button
      render(<Button type="button">ボタン</Button>);

      // When: コンポーネントがマウントされる
      const button = screen.getByRole("button");

      // Then: type="button" が設定される
      expect(button).toHaveAttribute("type", "button");
    });

    it("type=submit を指定するとフォーム送信ボタンになる", () => {
      // Given: type="submit" の Button
      render(<Button type="submit">送信</Button>);

      // When: コンポーネントがマウントされる
      const button = screen.getByRole("button");

      // Then: type="submit" が設定される
      expect(button).toHaveAttribute("type", "submit");
    });
  });
});
