// CloudflareワーカーのCORS設定を修正
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // 本番環境では具体的なオリジンを指定
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// OPTIONSリクエストのハンドラー
async function handleOptions(request) {
  return new Response(null, {
    headers: corsHeaders,
  });
}

async function handleRequest(request) {
  // プリフライトリクエストの処理
  if (request.method === "OPTIONS") {
    return handleOptions(request);
  }

  // 実際のリクエスト処理
  const response = await fetch(/* ... */);

  // レスポンスヘッダーにCORS設定を追加
  const responseHeaders = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    responseHeaders.set(key, value);
  });

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
