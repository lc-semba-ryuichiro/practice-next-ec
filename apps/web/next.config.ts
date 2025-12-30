import type { NextConfig } from "next";

/**
 * セキュリティヘッダー設定
 *
 * EC サイトとして安全に運用するため、ブラウザのセキュリティ機能を有効化するヘッダーを設定。
 * これらのヘッダーは OWASP (Open Web Application Security Project) の推奨に基づいている。
 *
 * @see https://owasp.org/www-project-secure-headers/
 * @see https://nextjs.org/docs/app/guides/content-security-policy
 */
const securityHeaders = [
  /*
   * X-Content-Type-Options: nosniff
   *
   * ブラウザが Content-Type ヘッダーを無視して MIME タイプを推測する動作（MIME スニッフィング）を防止。
   * 攻撃者が悪意のあるスクリプトを画像やテキストファイルに偽装してアップロードし、
   * ブラウザに実行させる攻撃を防ぐ。
   */
  { key: "X-Content-Type-Options", value: "nosniff" },

  /*
   * X-Frame-Options: DENY
   *
   * このサイトを iframe 内に埋め込むことを完全に禁止。
   * クリックジャッキング攻撃（透明な iframe を重ねてユーザーに意図しないクリックをさせる）を防止。
   * EC サイトでは決済や個人情報入力があるため、この攻撃への対策は必須。
   */
  { key: "X-Frame-Options", value: "DENY" },

  /*
   * X-XSS-Protection: 1; mode=block
   *
   * レガシーブラウザ向けの XSS (クロスサイトスクリプティング) フィルターを有効化。
   * 反射型 XSS を検出した場合、ページのレンダリングをブロックする。
   * 最新ブラウザでは CSP が推奨されるが、古いブラウザとの互換性のために設定。
   */
  { key: "X-XSS-Protection", value: "1; mode=block" },

  /*
   * X-DNS-Prefetch-Control: on
   *
   * DNS プリフェッチを有効化し、外部リソース（画像、API など）の DNS 解決を事前に行う。
   * EC サイトでは商品画像や決済 API など外部リソースが多いため、
   * ページ読み込みのパフォーマンス向上に寄与する。
   */
  { key: "X-DNS-Prefetch-Control", value: "on" },

  /*
   * Referrer-Policy: strict-origin-when-cross-origin
   *
   * リファラー（参照元 URL）情報の送信ポリシーを設定。
   * - 同一オリジン: 完全な URL を送信
   * - クロスオリジン (HTTPS → HTTPS): オリジン（ドメイン）のみ送信
   * - ダウングレード (HTTPS → HTTP): 送信しない
   *
   * EC サイトでは商品ページの URL にユーザーの閲覧履歴が含まれる可能性があるため、
   * 外部サイトへは最小限の情報のみ送信するこの設定が適切。
   */
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  /*
   * Permissions-Policy
   *
   * ブラウザの機能（カメラ、マイク、位置情報など）へのアクセスを制御。
   * 空の () はその機能を完全に無効化することを意味する。
   *
   * EC サイトではこれらの機能は不要なため、無効化することで：
   * - サードパーティスクリプトによる不正利用を防止
   * - ユーザーのプライバシーを保護
   */
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },

  /*
   * Strict-Transport-Security (HSTS)
   *
   * ブラウザに対して、このサイトへは常に HTTPS で接続するよう指示。
   * - max-age=63072000: 2年間（秒単位）この設定を記憶
   * - includeSubDomains: サブドメインも HTTPS 強制
   * - preload: ブラウザの HSTS プリロードリストへの登録を許可
   *
   * EC サイトでは決済情報や個人情報を扱うため、HTTPS 強制は必須。
   * 中間者攻撃（MITM）による通信傍受や改ざんを防止する。
   *
   * @see https://hstspreload.org/
   */
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/**
 * Next.js 設定
 */
const nextConfig: NextConfig = {
  /*
   * React Compiler を有効化
   *
   * React 19 で導入された React Compiler により、useMemo や useCallback を
   * 手動で書かなくても自動的にメモ化が行われる。
   */
  reactCompiler: true,

  /*
   * カスタムヘッダー設定
   *
   * Vercel デプロイ時にレスポンスヘッダーを追加する。
   * vercel.json ではなく next.config.ts で設定することで以下の利点がある。
   * - TypeScript による型安全性
   * - Next.js のビルドシステムとの統合
   * - 環境変数を使った動的な設定が可能
   */
  async headers() {
    return [
      /*
       * 全ルートにセキュリティヘッダーを適用
       *
       * /:path* は全てのパスにマッチするワイルドカードパターン。
       * ページ、API ルート、静的ファイル全てにセキュリティヘッダーが適用される。
       */
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      /*
       * 静的アセット用のキャッシュ設定
       *
       * public/ 配下の画像、フォント等に長期キャッシュを設定。
       * - public: CDN やプロキシでもキャッシュ可能
       * - max-age=31536000: 1年間（秒単位）キャッシュ
       * - immutable: ファイルは変更されないことを明示（再検証リクエストを防止）
       *
       * 注: /_next/static/* のアセットは Next.js がファイル名にハッシュを含めて
       * 自動的に適切なキャッシュヘッダーを設定するため、ここでの設定は不要。
       */
      {
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
