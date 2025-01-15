// utils/auth.js
export async function generateAccessToken() {
  //   const tenantId = process.env.TENANT_ID;
  const url = process.env.RESOURCE_URL;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const grantType = process.env.GRANT_TYPE;
  const scope = process.env.API_SCOPE;

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: grantType,
    scope: scope,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error("Failed to generate access token");
  }

  const data = await response.json();
  return data.access_token;
}
