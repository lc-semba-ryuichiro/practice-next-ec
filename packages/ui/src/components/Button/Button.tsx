import "./button.css";

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: (() => void) | undefined;
}

/**
 * ユーザーインタラクション用のプライマリ UI コンポーネント
 * @param props - ボタンのプロパティ
 * @param props.primary - メインのアクションボタンかどうか
 * @param props.size - ボタンのサイズ
 * @param props.backgroundColor - 背景色
 * @param props.label - ボタンのラベル
 * @returns ボタン要素
 */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...props
}: ButtonProps): React.JSX.Element => {
  const mode = primary ? "storybook-button--primary" : "storybook-button--secondary";
  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button--${size}`, mode].join(" ")}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
