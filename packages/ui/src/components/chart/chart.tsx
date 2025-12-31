import * as React from "react";

import { cn } from "@ui/lib/utils";
import * as RechartsPrimitive from "recharts";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>;

interface ChartContextProps {
  config: ChartConfig;
}

const ChartContext = React.createContext<ChartContextProps | null>(null);

/**
 * チャートのコンテキストを取得するフック
 * @returns チャートのコンテキスト値
 */
function useChart(): ChartContextProps {
  const context = React.useContext(ChartContext);

  if (context == null) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

/**
 * チャートのコンテナコンポーネント
 * @param root0 - コンポーネントのプロパティ
 * @param root0.id - チャートの識別子
 * @param root0.className - 追加のCSSクラス名
 * @param root0.children - チャートの子要素
 * @param root0.config - チャート設定オブジェクト
 * @returns チャートコンテナ要素
 */
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: Readonly<
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>): React.ReactElement {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle
          id={chartId}
          config={config}
        />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

/**
 * テーマに基づいてチャートカラーの動的CSSを生成
 * @param root0 - コンポーネントのプロパティ
 * @param root0.id - チャートの識別子
 * @param root0.config - チャート設定オブジェクト
 * @returns スタイル要素またはnull
 */
function ChartStyle({
  id,
  config,
}: Readonly<{ id: string; config: ChartConfig }>): React.ReactElement | null {
  const colorConfig = Object.entries(config).filter(
    ([, configItem]) => configItem.theme != null || configItem.color != null
  );

  if (colorConfig.length === 0) {
    return null;
  }

  const cssContent = Object.entries(THEMES)
    .map(
      ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color;
    return color != null ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
    )
    .join("\n");

  return <style>{cssContent}</style>;
}

const ChartTooltip = RechartsPrimitive.Tooltip;

/**
 * チャートのツールチップコンテンツ
 * @param root0 - コンポーネントのプロパティ
 * @param root0.active - ツールチップがアクティブかどうか
 * @param root0.payload - ツールチップに表示するデータ配列
 * @param root0.className - 追加のCSSクラス名
 * @param root0.indicator - インジケーターの表示形式
 * @param root0.hideLabel - ラベルを非表示にするかどうか
 * @param root0.hideIndicator - インジケーターを非表示にするかどうか
 * @param root0.label - 表示するラベル
 * @param root0.labelFormatter - ラベルのフォーマット関数
 * @param root0.labelClassName - ラベルのCSSクラス名
 * @param root0.formatter - 値のフォーマット関数
 * @param root0.color - インジケーターの色
 * @param root0.nameKey - 名前を取得するキー
 * @param root0.labelKey - ラベルを取得するキー
 * @returns ツールチップコンテンツ要素またはnull
 */
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: Readonly<
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>): React.ReactElement | null {
  const { config } = useChart();

  /**
   * ツールチップに表示するラベルを生成する。
   *
   * sonarjs/function-return-type を無効化している理由:
   * React.ReactNode 型は設計上 null | ReactElement | string | number 等を含む共用体型であり、
   * 条件に応じて null または JSX を返すのは React の標準的なパターン。
   * このルールは「常に同じ構造の型を返すべき」という方針だが、
   * React コンポーネントでは条件付きレンダリングが一般的なため、ここでは無効化する。
   */
  // eslint-disable-next-line sonarjs/function-return-type
  const tooltipLabel = React.useMemo((): React.ReactNode => {
    if (hideLabel || (payload?.length ?? 0) === 0) {
      return null;
    }

    const [item] = payload ?? [];
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const configLabel =
      // eslint-disable-next-line security/detect-object-injection -- Object.hasOwn で存在確認済みのキーでアクセスしているため安全
      typeof label === "string" && Object.hasOwn(config, label) ? config[label]?.label : undefined;
    const value =
      labelKey == null && typeof label === "string" ? (configLabel ?? label) : itemConfig?.label;

    if (labelFormatter != null) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value, payload ?? [])}
        </div>
      );
    }

    if (value == null) {
      return null;
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (active !== true || (payload?.length ?? 0) === 0) {
    return null;
  }

  const shouldNestLabel = payload?.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!shouldNestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          ?.filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor =
              color ??
              (item.payload as Record<string, unknown> | undefined)?.["fill"] ??
              item.color;

            return (
              <div
                key={String(item.dataKey)}
                className={cn(
                  "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter != null && item.value !== undefined && item.name != null ? (
                  formatter(item.value, item.name, item, index, payload)
                ) : (
                  <>
                    {itemConfig?.icon != null ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": shouldNestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        shouldNestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {shouldNestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value != null && (
                        <span className="text-foreground font-mono font-medium tabular-nums">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

/**
 * チャートの凡例コンテンツ
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @param root0.hideIcon - アイコンを非表示にするかどうか
 * @param root0.payload - 凡例に表示するデータ配列
 * @param root0.verticalAlign - 垂直方向の配置
 * @param root0.nameKey - 名前を取得するキー
 * @returns 凡例コンテンツ要素またはnull
 */
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: Readonly<
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>): React.ReactElement | null {
  const { config } = useChart();

  if ((payload?.length ?? 0) === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload
        ?.filter((item) => item.type !== "none")
        .map((item) => {
          const key = nameKey ?? String(item.dataKey ?? "value");
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={String(item.value)}
              className={cn(
                "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
              )}
            >
              {itemConfig?.icon != null && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
}

/**
 * ペイロードからチャート設定項目を抽出するヘルパー関数
 * @param config - チャート設定オブジェクト
 * @param payload - データペイロード
 * @param key - 設定を取得するキー
 * @returns 設定項目またはundefined
 */
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
): ChartConfig[string] | undefined {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  const configLabelKey = ((): string => {
    if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
      return payload[key as keyof typeof payload] as string;
    }
    if (
      payloadPayload != null &&
      key in payloadPayload &&
      typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
    ) {
      return payloadPayload[key as keyof typeof payloadPayload] as string;
    }
    return key;
  })();

  if (Object.hasOwn(config, configLabelKey)) {
    // eslint-disable-next-line security/detect-object-injection -- Object.hasOwn で存在確認済みのキーでアクセスしているため安全
    return config[configLabelKey];
  }
  if (Object.hasOwn(config, key)) {
    // eslint-disable-next-line security/detect-object-injection -- Object.hasOwn で存在確認済みのキーでアクセスしているため安全
    return config[key];
  }
  return undefined;
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
