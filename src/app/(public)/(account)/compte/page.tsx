import { ProfileManagement } from "@/components/user/ProfileManagement";
import { supabaseServer } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const sb = await supabaseServer();

  // Vérifier l'authentification
  const {
    data: { user },
    error,
  } = await sb.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Récupérer les données de profil
  const { data: profile } = await sb
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const userData = {
    name: profile?.full_name || user.user_metadata?.full_name,
    email: user.email,
    phone: profile?.phone,
    avatar: profile?.avatar_url,
    created_at: user.created_at,
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <ProfileManagement user={userData} />
      </div>
    </div>
  );
}
