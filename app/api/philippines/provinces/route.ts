import { NextResponse } from "next/server"

const provinces = {
  "NCR": [
    { code: "MNL", name: "Manila" },
    { code: "QZN", name: "Quezon City" },
    { code: "MKT", name: "Makati" },
    { code: "TGG", name: "Taguig" },
    { code: "PSG", name: "Pasig" },
  ],
  "IV-A": [
    { code: "BTG", name: "Batangas" },
    { code: "CVT", name: "Cavite" },
    { code: "LGN", name: "Laguna" },
    { code: "QZN", name: "Quezon" },
    { code: "RSL", name: "Rizal" },
  ],
  // Add more provinces for other regions
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const region = searchParams.get("region")

  if (!region) {
    return NextResponse.json({ error: "Region parameter is required" }, { status: 400 })
  }

  const provinceList = provinces[region as keyof typeof provinces] || []
  return NextResponse.json(provinceList)
} 