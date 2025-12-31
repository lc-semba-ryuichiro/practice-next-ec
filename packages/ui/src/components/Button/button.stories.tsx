import { Loader2, Mail, Plus, Trash2 } from "lucide-react";
import { expect, fn, userEvent, within } from "storybook/test";

import { Button } from "./button";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "コンポーネント/ボタン",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive", "ghost", "link"],
      description: "ボタンのスタイルバリアント",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
      description: "ボタンのサイズ",
    },
    asChild: {
      control: "boolean",
      description: "true の場合、子要素をそのままレンダリング",
    },
    disabled: {
      control: "boolean",
      description: "ボタンを無効化",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトのボタン。最も基本的な使い方。
 */
export const Default: Story = {
  args: {
    children: "ボタン",
  },
};

/**
 * Controls パネルで全ての props を操作可能。
 */
export const Playground: Story = {
  args: {
    children: "Playground",
    variant: "default",
    size: "default",
    disabled: false,
  },
};

/**
 * 全ての variant を一覧表示。
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

/**
 * 全ての size を一覧表示。
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * アイコン + テキストの組み合わせ。
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>
        <Mail />
        メール送信
      </Button>
      <Button variant="secondary">
        <Plus />
        新規作成
      </Button>
      <Button variant="destructive">
        <Trash2 />
        削除
      </Button>
    </div>
  ),
};

/**
 * アイコンのみボタン。icon/icon-sm/icon-lg の3サイズ。
 */
export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="小さい追加ボタン"
      >
        <Plus />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="追加ボタン"
      >
        <Plus />
      </Button>
      <Button
        variant="outline"
        size="icon-lg"
        aria-label="大きい追加ボタン"
      >
        <Plus />
      </Button>
    </div>
  ),
};

/**
 * asChild を使った `<a>` タグとしてのレンダリング。
 */
export const AsLink: Story = {
  render: () => (
    <Button
      asChild
      variant="link"
    >
      <a
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        外部リンク
      </a>
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "外部リンク" });

    // Given: asChild=true で <a> タグがレンダリングされている
    // Then: リンク要素として正しい属性を持つ
    await expect(link).toHaveAttribute("href", "https://example.com");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  },
};

/**
 * 無効化状態の表示。
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled>Default</Button>
      <Button
        variant="secondary"
        disabled
      >
        Secondary
      </Button>
      <Button
        variant="outline"
        disabled
      >
        Outline
      </Button>
      <Button
        variant="destructive"
        disabled
      >
        Destructive
      </Button>
      <Button
        variant="ghost"
        disabled
      >
        Ghost
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");

    // Given: disabled=true のボタンがレンダリングされている
    // Then: 全てのボタンが disabled 状態である
    for (const button of buttons) {
      await expect(button).toBeDisabled();
    }
  },
};

/**
 * ローディング状態（アイコン + disabled）。
 */
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled>
        <Loader2 className="animate-spin" />
        読み込み中...
      </Button>
      <Button
        variant="secondary"
        disabled
      >
        <Loader2 className="animate-spin" />
        処理中...
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");

    // Given: ローディング状態のボタンがレンダリングされている
    // Then: 全てのボタンが disabled 状態である
    for (const button of buttons) {
      await expect(button).toBeDisabled();
    }
  },
};

/**
 * クリックハンドラのテスト。Interaction Test で検証。
 */
export const ClickInteraction: Story = {
  args: {
    children: "クリックしてテスト",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Given: onClick ハンドラ付きの Button がレンダリングされている
    // When: ユーザーがボタンをクリックする
    await userEvent.click(button);

    // Then: onClick が呼び出される
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/**
 * キーボード操作のテスト。Enter と Space キーで onClick が発火。
 */
export const KeyboardInteraction: Story = {
  args: {
    children: "キーボードでテスト",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Given: onClick ハンドラ付きの Button がレンダリングされている
    // When: ボタンにフォーカスして Enter キーを押す
    button.focus();
    await userEvent.keyboard("{Enter}");

    // Then: onClick が呼び出される
    await expect(args.onClick).toHaveBeenCalled();

    // When: Space キーを押す
    await userEvent.keyboard(" ");

    // Then: onClick が再度呼び出される
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

/**
 * disabled 時はクリックイベントが発火しない。
 */
export const DisabledNoClick: Story = {
  args: {
    children: "無効なボタン",
    disabled: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Given: disabled=true の Button がレンダリングされている
    // Then: ボタンが disabled 状態である
    await expect(button).toBeDisabled();

    // When: ボタンをクリックしようとする
    await userEvent.click(button);

    // Then: onClick が呼ばれない
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
