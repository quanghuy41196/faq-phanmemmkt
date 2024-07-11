import { AUTH_TOKEN } from "@/services/axios/httpClient";
import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export const redirectUrl = ({
  path,
  baseUrl,
}: {
  path: string;
  baseUrl: string;
}) => {
  const url = new URL(path, baseUrl);
  return NextResponse.redirect(url);
};

export const removeCookieMiddleware = (response?: NextResponse<unknown>) => {
  const newResponse = response ?? NextResponse.next();
  newResponse.cookies.delete(AUTH_TOKEN);
  return newResponse;
};

export const decodeJwtToken = <T>(jwtToken: string): T | null => {
  const decode: T = jwtDecode(jwtToken);
  return decode;
};

export const checkJwtToken = (jwtToken: string) => {
  if (!jwtToken) {
    return false;
  }
  try {
    const decode = decodeJwtToken<{ id: number; iat: number; exp: number }>(
      jwtToken
    );
    const expDate = new Date((decode?.exp ?? 0) * 1000);

    if (new Date() > expDate) {
      return false;
    }
  } catch (error) {
    return false;
  }
  return true;
};
