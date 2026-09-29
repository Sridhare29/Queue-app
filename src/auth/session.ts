const TOKEN_KEY = "queue-app.access-token";
const ROLE_KEY = "queue-app.role";
const PROFILE_KEY = "queue-app.profile";

export type UserProfile = {
  name: string;
  mobileNumber: string;
};

type AuthPayload = {
  token?: unknown;
  accessToken?: unknown;
  jwtToken?: unknown;
  role?: unknown;
  roles?: unknown;
  name?: unknown;
  mobileNumber?: unknown;
  mobileNo?: unknown;
  phoneNumber?: unknown;
  user?: AuthPayload;
  data?: AuthPayload;
};

function getPayloadRole(payload: AuthPayload | undefined): string | null {
  if (!payload) return null;

  const role = payload.role ?? payload.roles ?? payload.user?.role ?? payload.user?.roles;
  if (Array.isArray(role)) return typeof role[0] === "string" ? role[0] : null;
  return typeof role === "string" ? role : null;
}

function getTokenRole(token: string): string | null {
  try {
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) return null;

    const base64 = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(paddedBase64), (character) => character.charCodeAt(0));
    const claims = JSON.parse(new TextDecoder().decode(bytes)) as Record<string, unknown>;
    const roleClaim = Object.entries(claims).find(([key]) =>
      key.toLowerCase() === "role" || key.toLowerCase().endsWith("/role")
    )?.[1];

    if (Array.isArray(roleClaim)) return typeof roleClaim[0] === "string" ? roleClaim[0] : null;
    return typeof roleClaim === "string" ? roleClaim : null;
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUserRole(): string | null {
  const storedRole = localStorage.getItem(ROLE_KEY);
  if (storedRole) return storedRole;

  const token = getAccessToken();
  return token ? getTokenRole(token) : null;
}

export function saveSession(token: string, role?: string | null): void {
  localStorage.setItem(TOKEN_KEY, token);
  const resolvedRole = role || getTokenRole(token);
  if (resolvedRole) localStorage.setItem(ROLE_KEY, resolvedRole);
  else localStorage.removeItem(ROLE_KEY);
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function getTokenProfile(token: string): UserProfile | null {
  try {
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) return null;

    const base64 = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(paddedBase64), (character) => character.charCodeAt(0));
    const claims = JSON.parse(new TextDecoder().decode(bytes)) as Record<string, unknown>;
    const claim = (names: string[]) => Object.entries(claims).find(([key]) =>
      names.some((name) => key.toLowerCase() === name || key.toLowerCase().endsWith(`/${name}`))
    )?.[1];
    const name = claim(["name", "given_name", "unique_name"]);
    const mobileNumber = claim([
      "mobile_number",
      "mobilenumber",
      "mobileno",
      "mobilephone",
      "phone_number",
      "phone",
    ]);

    return {
      name: typeof name === "string" ? name : "",
      mobileNumber: typeof mobileNumber === "string" ? mobileNumber : "",
    };
  } catch {
    return null;
  }
}

export function getUserProfile(): UserProfile | null {
  const storedProfile = localStorage.getItem(PROFILE_KEY);
  let profile: UserProfile | null = null;

  if (storedProfile) {
    try {
      profile = JSON.parse(storedProfile) as UserProfile;
    } catch {
      localStorage.removeItem(PROFILE_KEY);
    }
  }

  const token = getAccessToken();
  const tokenProfile = token ? getTokenProfile(token) : null;

  if (!profile && !tokenProfile) return null;

  return {
    name: profile?.name || tokenProfile?.name || "",
    mobileNumber: profile?.mobileNumber || tokenProfile?.mobileNumber || "",
  };
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(PROFILE_KEY);
}

export function getAuthToken(payload: unknown): string | null {
  if (typeof payload === "string") return payload;
  if (!payload || typeof payload !== "object") return null;

  const response = payload as AuthPayload;
  const token = response.accessToken ?? response.token ?? response.jwtToken
    ?? response.data?.accessToken ?? response.data?.token ?? response.data?.jwtToken;
  return typeof token === "string" && token.length > 0 ? token : null;
}

export function getAuthRole(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const response = payload as AuthPayload;
  return getPayloadRole(response) ?? getPayloadRole(response.data);
}

export function getAuthProfile(payload: unknown): UserProfile | null {
  if (!payload || typeof payload !== "object") return null;
  const response = payload as AuthPayload;
  const source = response.user ?? response.data?.user ?? response.data ?? response;
  const name = source.name;
  const mobileNumber = source.mobileNumber ?? source.mobileNo ?? source.phoneNumber;

  if (typeof name !== "string" && typeof mobileNumber !== "string") return null;
  return {
    name: typeof name === "string" ? name : "",
    mobileNumber: typeof mobileNumber === "string" ? mobileNumber : "",
  };
}

export function isAdmin(): boolean {
  return getUserRole()?.toLowerCase() === "admin";
}