import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      agent: {
        versionCode: 8,
        versionName: "1.0.8",
        downloadUrl: "https://cashall.in/api/v1/download/agent",
        forceUpdate: true,
        title: "CashALL Agent Update Available (v1.0.8)",
        releaseNotes: "Optimized battery performance, reduced background network traffic, and enhanced lead alert reliability.",
        announcement: "IMPORTANT: Audio recording is disabled for all field agents. We only verify call status (whether the customer was called).",
      },
      caller: {
        versionCode: 3,
        versionName: "1.0.3",
        downloadUrl: "https://cashall.in/api/v1/download/caller",
        forceUpdate: false,
        title: "CashALL Caller Desk Update Available",
        releaseNotes: "Company phone support desk call tagging and HD audio sync.",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch app version" },
      { status: 500 }
    );
  }
}
