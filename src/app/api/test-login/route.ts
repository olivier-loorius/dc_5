import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Log pour debug
    console.log("📧 Test login reçu:", {
      email,
      password: password ? "****" : "vide",
    });

    return NextResponse.json({
      success: true,
      message: "API de test OK",
      data: { email, hasPassword: !!password },
    });
  } catch (error) {
    console.error("❌ Erreur test login:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
