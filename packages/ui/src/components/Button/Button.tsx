import "./button.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
}

/**
 * ユーザーインタラクション用のプライマリ UI コンポーネント
 * @param props - ボタンのプロパティ
 * @param props.primary - メインのアクションボタンかどうか
 * @param props.size - ボタンのサイズ
 * @param props.backgroundColor - 背景色
 * @param props.label - ボタンのラベル
 * @param props.className - 追加のCSSクラス
 * @param props.type - ボタンのtype属性
 * @returns ボタン要素
 */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  className,
  type = "button",
  ...props
}: ButtonProps): React.JSX.Element => {
  const mode = primary ? "storybook-button--primary" : "storybook-button--secondary";
  const classes = ["storybook-button", `storybook-button--${size}`, mode, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
