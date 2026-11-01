export async function GET() {
  const response = await fetch(
    "https://practice-api.speedhive.com/api/v1/locations/4389/activities?count=25&offset=0",
    {
      headers: {
        Accept: "application/json",
        Origin: "https://speedhive.mylaps.com",
        Referer: "https://speedhive.mylaps.com/",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    }
  );

  const data = await response.json();

  return Response.json(data);
}