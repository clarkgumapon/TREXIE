import { NextResponse } from "next/server"

const cities = {
  "MNL": [
    { code: "SMP", name: "Sampaloc" },
    { code: "TNO", name: "Tondo" },
    { code: "BND", name: "Binondo" },
    { code: "ERM", name: "Ermita" },
    { code: "MLT", name: "Malate" },
  ],
  "BTG": [
    { code: "BTG", name: "Batangas City" },
    { code: "LPP", name: "Lipa" },
    { code: "TNY", name: "Tanauan" },
    { code: "SNT", name: "Santo Tomas" },
    { code: "LMR", name: "Lemery" },
  ],
  // Add more cities for other provinces
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const province = searchParams.get("province")

  if (!province) {
    return NextResponse.json({ error: "Province parameter is required" }, { status: 400 })
  }

  const cityList = cities[province as keyof typeof cities] || []
  return NextResponse.json(cityList)
} 