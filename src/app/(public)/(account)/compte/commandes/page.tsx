import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faEye,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";

export default async function OrdersPage() {
  const sb = await supabaseServer();

  const {
    data: { user },
    error,
  } = await sb.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // TODO: Récupérer les vraies commandes depuis Supabase
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      total: 89.99,
      status: "Livré",
      items: 3,
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-10",
      total: 45.5,
      status: "En cours",
      items: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Mes commandes
          </h1>
          <p className="text-muted-foreground">
            Suivez vos commandes et consultez l'historique
          </p>
        </div>

        {orders.length === 0 ? (
          <Card className="p-8 text-center">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="h-12 w-12 text-muted-foreground mx-auto mb-4"
            />
            <h2 className="text-lg font-medium text-foreground mb-2">
              Aucune commande
            </h2>
            <p className="text-muted-foreground mb-4">
              Vous n'avez pas encore passé de commande
            </p>
            <Button asChild>
              <a href="/">Découvrir nos produits</a>
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Commande {order.id}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Passée le{" "}
                      {new Date(order.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Livré"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      }`}
                    >
                      {order.status}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      {order.items} article{order.items > 1 ? "s" : ""}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-foreground">
                      {order.total.toFixed(2)} €
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FontAwesomeIcon icon={faEye} className="mr-2 h-4 w-4" />
                      Détails
                    </Button>
                    {order.status === "Livré" && (
                      <Button variant="outline" size="sm">
                        <FontAwesomeIcon
                          icon={faRedo}
                          className="mr-2 h-4 w-4"
                        />
                        Recommander
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
