import { redirect } from "next/navigation";

export default function LegacyCompareRedirectPage() {
  redirect("/compare/cashall-vs-other-platforms");
}
