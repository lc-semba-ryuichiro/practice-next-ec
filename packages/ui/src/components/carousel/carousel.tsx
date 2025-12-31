import * as React from "react";

import { cn } from "@ui/lib/utils";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "../button/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

/**
 * カルーセルのコンテキストを取得するフック
 * @returns カルーセルのコンテキスト値
 */
function useCarousel(): CarouselContextProps {
  const context = React.useContext(CarouselContext);

  if (context == null) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

/**
 * 複数コンテンツをスライド表示するカルーセル
 * @param root0 - コンポーネントのプロパティ
 * @param root0.orientation - スライド方向
 * @param root0.opts - Emblaカルーセルのオプション
 * @param root0.setApi - カルーセルAPIを受け取るコールバック
 * @param root0.plugins - Emblaプラグイン配列
 * @param root0.className - 追加のCSSクラス名
 * @param root0.children - 子要素
 * @returns カルーセル要素
 */
function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: Readonly<React.ComponentProps<"div"> & CarouselProps>): React.ReactElement {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrevious, setCanScrollPrevious] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((carouselApi: CarouselApi): void => {
    if (carouselApi == null) return;
    setCanScrollPrevious(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
  }, []);

  const scrollPrevious = React.useCallback((): void => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback((): void => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrevious, scrollNext]
  );

  React.useEffect(() => {
    if (api == null || setApi == null) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    // eslint-disable-next-line security/detect-possible-timing-attacks -- api は Embla Carousel のオブジェクト参照であり、機密データではないためタイミング攻撃のリスクはない
    if (api == null) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return (): void => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation,
        scrollPrev: scrollPrevious,
        scrollNext,
        canScrollPrev: canScrollPrevious,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

/**
 * カルーセルのコンテンツコンテナ
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns コンテンツコンテナ要素
 */
function CarouselContent({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
        {...props}
      />
    </div>
  );
}

/**
 * カルーセルの各スライド項目
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @returns スライド項目要素
 */
function CarouselItem({
  className,
  ...props
}: Readonly<React.ComponentProps<"div">>): React.ReactElement {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
}

/**
 * カルーセルの前へ戻るボタン
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @param root0.variant - ボタンの表示バリエーション
 * @param root0.size - ボタンのサイズ
 * @returns 前へボタン要素
 */
function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: Readonly<React.ComponentProps<typeof Button>>): React.ReactElement {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

/**
 * カルーセルの次へ進むボタン
 * @param root0 - コンポーネントのプロパティ
 * @param root0.className - 追加のCSSクラス名
 * @param root0.variant - ボタンの表示バリエーション
 * @param root0.size - ボタンのサイズ
 * @returns 次へボタン要素
 */
function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: Readonly<React.ComponentProps<typeof Button>>): React.ReactElement {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
