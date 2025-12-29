/**
 * Auth Feature - 認証機能
 * @module features/auth
 */

// UI Components
export { LoginForm } from "./ui/login-form";
export { RegisterForm } from "./ui/register-form";
export { LogoutButton } from "./ui/logout-button";
export { AuthGuard } from "./ui/auth-guard";

// Hooks
export { useLogin } from "./api/use-login";
export { useLogout } from "./api/use-logout";
export { useSession } from "./api/use-session";
export { useRegister } from "./api/use-register";

// Atoms
export { sessionAtom, isAuthenticatedAtom } from "./model/auth.atoms";

// Types
export type { LoginCredentials, RegisterData, Session } from "./model/auth.types";

// Schemas
export { loginSchema, registerSchema } from "./model/auth.schemas";

// Form Types
export type { LoginFormInput, RegisterFormInput } from "./model/auth.schemas";
