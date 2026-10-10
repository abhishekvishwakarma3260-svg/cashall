import { NextRequest } from "next/server";
import { firebaseAdmin } from "../services/firebase";
import { AppError } from "../utils/AppError";
import { verifySessionToken } from "../auth/session-token";

export interface DecodedUser {
  uid: string;
  phone?: string;
  email?: string;
  role: string;
}

export async function verifyAuthToken(req: NextRequest): Promise<DecodedUser> {
  const authHeader = req.headers.get("authorization");
  const cookieToken = req.cookies.get("cashall_admin_token")?.value;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : cookieToken || null;

  if (!token) {
    throw new AppError("Authentication required. Please log in.", 401);
  }

  // 1. First, check if the token is a cryptographically signed HMAC-SHA256 session token
  const verifiedSession = verifySessionToken(token);
  if (verifiedSession) {
    return {
      uid: verifiedSession.uid,
      phone: verifiedSession.phone,
      email: verifiedSession.email,
      role: verifiedSession.role,
    };
  }

  // 2. Otherwise verify via Firebase Admin ID token
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    return {
      uid: decodedToken.uid,
      phone: decodedToken.phone_number,
      email: decodedToken.email,
      role: (decodedToken.role as string) || "CUSTOMER",
    };
  } catch (error: any) {
    throw new AppError(`Authentication failed: Invalid or expired session credentials.`, 401);
  }
}

export function requireRole(allowedRoles: string[], userRole: string) {
  if (!allowedRoles.includes(userRole)) {
    throw new AppError("Access denied. Insufficient permissions.", 403);
  }
}
