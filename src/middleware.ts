import { NextRequest, NextResponse } from "next/server";
import { routerPath } from "./config";
import { joinPathParent } from "./helper/functions";
import { checkJwtToken, redirectUrl, removeCookieMiddleware } from "./middlewares";
import { AUTH_TOKEN } from "./services/axios/httpClient";

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const accessToken = cookies.get(AUTH_TOKEN)?.value ?? "";

  const pathAdmin = joinPathParent(routerPath.admin);
  const pathHome = joinPathParent(routerPath.home);
  const pathLogin = joinPathParent(
    routerPath.admin,
    routerPath.auth,
    routerPath.login
  );

  const responseRedirectHome = redirectUrl({
    baseUrl: req.url,
    path: pathHome,
  });

  if (
    !accessToken &&
    nextUrl.pathname.startsWith(pathAdmin) &&
    !nextUrl.pathname.startsWith(pathLogin)
  ) {
    return responseRedirectHome;
  } else if (accessToken && nextUrl.pathname.startsWith(pathLogin)) {
    return responseRedirectHome;
  }

  if (
    !checkJwtToken(accessToken ?? "") &&
    nextUrl.pathname.startsWith(pathAdmin) &&
    !nextUrl.pathname.startsWith(pathLogin)
  ) {
    const responseLogin = redirectUrl({
      path: pathLogin,
      baseUrl: req.url,
    });
    return removeCookieMiddleware(responseLogin);
  }

  const response = NextResponse.next();
  response.headers.set("x-origin", nextUrl.href);
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
