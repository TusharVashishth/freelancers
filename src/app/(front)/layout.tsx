import AppNav from "@/components/common/AppNav";
import MobileAppNav from "@/components/common/MobileAppNav";
import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";

export default async function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getSession();

  return (
    <div className="p-2 md:container overflow-y-hidden h-screen relative">
      <AppNav user={data.session?.user!} />
      <MobileAppNav user={data.session?.user!} />
      <div className="flex flex-col items-center overflow-y-scroll h-full pb-20">
        <div className="w-full lg:w-2/5">{children}</div>
      </div>
    </div>
  );
}
