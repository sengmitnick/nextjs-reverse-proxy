import { NextResponse } from "next/server";

export async function handleRequest(request: Request) {
  try {
    const url = new URL(request.url);
    const targetUrl = new URL(
      process.env.NOTION_BASE_URL! + url.pathname + url.search
    );

    if (["/v1", "/api/v1"].includes(url.pathname)) {
      return new Response(`
          Usage:\n
            ${url.origin}/<url>
        `);
    }

    if (url.pathname.startsWith("/api/v1/oauth/authorize")) {
      return NextResponse.redirect(targetUrl, 302);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
          "Access-Control-Allow-Headers":
            "Authorization, Content-Type, Notion-Version",
        },
      });
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Notion-Version", process.env.NOTION_VERSION!);

    let response = await fetch(targetUrl, {
      method: request.method,
      headers: requestHeaders,
      redirect: "follow",
      body: request.body,
    });
    response = new Response(response.body, response);
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, HEAD, POST, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Accept, Authorization, Content-Type, Notion-Version"
    );

    return response;
  } catch (e: any) {
    return new Response(e.stack || e, { status: 500 });
  }
}
