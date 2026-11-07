import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } =
    await supabase
      .from("page_views")
      .select("id");

  if (error) {
    console.error(error);

    return NextResponse.json({
      count: 0,
      error: error.message,
    });
  }

  return NextResponse.json({
    count: data.length,
  });
}

export async function POST() {
  const { error } =
    await supabase
      .from("page_views")
      .insert({});

  if (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}