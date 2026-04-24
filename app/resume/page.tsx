import { redirect } from "next/navigation";

// Legacy route — everything lives on the single-page scroll now.
export default function ResumeRedirect() {
  redirect("/#projects");
}
