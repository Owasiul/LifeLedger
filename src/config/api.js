const PREVIEW_SERVER = "https://life-ledger-server-p8k1wee5y-owasiuls-projects.vercel.app";
const PRODUCTION_SERVER = "https://life-ledger-server.vercel.app";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? PRODUCTION_SERVER : PREVIEW_SERVER);
