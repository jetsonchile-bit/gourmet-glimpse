import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Eye, Minus, Plus, ShoppingBag, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import burgerImage from "@/assets/doble-fuego.jpg";
import chickenImage from "@/assets/pollo-crujiente.jpg";
import friesImage from "@/assets/papas-loaded.jpg";
import wingsImage from "@/assets/alitas-glaseadas.jpg";

type Dish = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  portion: string;
  serves: string;
  detail: string;
  tag?: string;
};

const dishes: Dish[] = [
  {
    id: 1,
    name: "Doble Fuego",
    category: "Hamburguesas",
    description: "Doble smash, cheddar, cebolla dorada y pepinillos.",
    price: 10.9,
    image: burgerImage,
    portion: "430 g",
    serves: "1 persona",
    detail: "Dos carnes smash de 150 g, cheddar madurado, cebolla dorada, pepinillos y salsa de la casa. Incluye papas clásicas.",
    tag: "Más pedido",
  },
  {
    id: 2,
    name: "Pollo Crujiente",
    category: "Hamburguesas",
    description: "Pollo marinado, coleslaw fresco, pepinillos y salsa picante.",
    price: 9.8,
    image: chickenImage,
    portion: "390 g",
    serves: "1 persona",
    detail: "Filete de pollo marinado durante 12 horas, rebozado al momento, ensalada de col fresca y salsa ligeramente picante. Incluye papas.",
    tag: "Nuevo",
  },
  {
    id: 3,
    name: "Papas Sin Freno",
    category: "Para compartir",
    description: "Cheddar fundido, tocino, cebollín y salsa de la casa.",
    price: 7.5,
    image: friesImage,
    portion: "520 g",
    serves: "2 personas",
    detail: "Una fuente generosa de papas doradas con cheddar fundido, tocino crujiente, cebollín y nuestra salsa ahumada.",
  },
  {
    id: 4,
    name: "Alitas Caramelo",
    category: "Para compartir",
    description: "Ocho alitas glaseadas, sésamo y dos salsas para untar.",
    price: 8.9,
    image: wingsImage,
    portion: "8 unidades",
    serves: "1–2 personas",
    detail: "Ocho alitas crujientes bañadas en glaseado dulce-picante, terminadas con sésamo y cebollín. Incluye dos salsas.",
  },
];

const categories = ["Todo", "Hamburguesas", "Para compartir"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MORDIDA — Cocina rápida, hecha en serio" },
      { name: "description", content: "Explora hamburguesas, pollo y acompañamientos con fotografías y porciones reales antes de pedir." },
      { property: "og:title", content: "MORDIDA — Cocina rápida, hecha en serio" },
      { property: "og:description", content: "Mira cada plato en detalle, conoce la porción real y pide sin sorpresas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RestaurantMenu,
});

function RestaurantMenu() {
  const [category, setCategory] = useState("Todo");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  const visibleDishes = useMemo(
    () => (category === "Todo" ? dishes : dishes.filter((dish) => dish.category === category)),
    [category],
  );

  const openDish = (dish: Dish) => {
    setQuantity(1);
    setSelectedDish(dish);
  };

  const addToOrder = () => {
    setCartCount((count) => count + quantity);
    setSelectedDish(null);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b-2 border-foreground bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 lg:px-10">
          <a href="#menu" className="font-display text-2xl uppercase lg:text-3xl" aria-label="Mordida, inicio">
            Mor<span className="text-primary">di</span>da<span className="text-primary">.</span>
          </a>
          <p className="hidden items-center gap-2 text-sm font-semibold uppercase md:flex">
            <span className="size-2 bg-primary" /> Abierto hoy · 12:00–23:00
          </p>
          <Button variant="menu" className="h-11 px-4 uppercase" aria-label={`Pedido con ${cartCount} productos`}>
            <ShoppingBag /> Pedido <span className="grid size-6 place-items-center bg-accent text-accent-foreground">{cartCount}</span>
          </Button>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:px-10 lg:py-20">
          <div>
            <div className="mb-5 flex items-center gap-2 text-sm font-bold uppercase text-primary">
              <Sparkles className="size-4" /> Fast food, sin atajos
            </div>
            <h1 className="max-w-5xl font-display text-5xl uppercase leading-[0.92] sm:text-6xl lg:text-8xl">
              Mira bien.<br />Come <span className="text-primary">mejor.</span>
            </h1>
          </div>
          <div className="border-l-4 border-accent pl-5 lg:mb-2">
            <p className="max-w-md text-xl font-medium leading-snug text-foreground/75 lg:text-2xl">
              Fotografías honestas. Porciones reales. Todo lo que necesitas saber antes del primer bocado.
            </p>
            <a href="#menu" className="mt-5 inline-flex items-center gap-2 border-b-2 border-foreground text-sm font-bold uppercase">
              Ver la carta <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-[1500px] px-5 py-12 lg:px-10 lg:py-16">
        <div className="mb-10 flex flex-col gap-6 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-primary">La carta · Hoy</p>
            <h2 className="font-display text-4xl uppercase sm:text-5xl">Elige por los ojos.</h2>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Filtrar platos por categoría">
            {categories.map((item) => (
              <Button key={item} variant="filter" data-active={category === item} onClick={() => setCategory(item)}>
                {item}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
          {visibleDishes.map((dish, index) => (
            <article key={dish.id} className="group min-w-0">
              <button
                type="button"
                onClick={() => openDish(dish)}
                className="relative block w-full cursor-zoom-in overflow-hidden border border-foreground bg-muted text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label={`Ver ${dish.name} en detalle`}
              >
                <img
                  src={dish.image}
                  alt={`${dish.name}, porción completa servida`}
                  width={1536}
                  height={1024}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
                {dish.tag && (
                  <span className="absolute left-4 top-4 border border-foreground bg-accent px-3 py-1 text-xs font-bold uppercase text-accent-foreground">
                    {dish.tag}
                  </span>
                )}
                <span className="absolute bottom-4 right-4 flex size-12 items-center justify-center border-2 border-foreground bg-background text-foreground shadow-[3px_3px_0_var(--primary)] transition-transform group-hover:-translate-y-1">
                  <Eye className="size-5" />
                </span>
              </button>
              <button type="button" onClick={() => openDish(dish)} className="mt-5 block w-full cursor-pointer text-left">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase text-primary">{dish.category}</p>
                    <h3 className="font-display text-2xl uppercase sm:text-3xl">{dish.name}</h3>
                  </div>
                  <p className="font-display text-2xl">${dish.price.toFixed(2)}</p>
                </div>
                <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-base text-muted-foreground">{dish.description}</p>
                  <p className="shrink-0 text-xs font-bold uppercase">{dish.portion} · {dish.serves}</p>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <footer className="mt-8 border-t-2 border-foreground bg-foreground text-background">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between lg:px-10">
          <p className="font-display text-4xl uppercase">Mordida<span className="text-primary">.</span></p>
          <div className="text-sm text-background/70 sm:text-right">
            <p>Comida rápida hecha en serio.</p>
            <p>Recoge en local · Delivery disponible</p>
          </div>
        </div>
      </footer>

      <Dialog open={selectedDish !== null} onOpenChange={(open) => !open && setSelectedDish(null)}>
        {selectedDish && (
          <DialogContent className="detail-enter max-h-[94vh] max-w-[1180px] gap-0 overflow-y-auto border-2 border-foreground bg-background p-0 shadow-[8px_8px_0_var(--accent)] sm:rounded-none">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
              <div className="relative min-h-[360px] bg-muted lg:min-h-[700px]">
                <img
                  src={selectedDish.image}
                  alt={`${selectedDish.name}, vista ampliada de la porción completa`}
                  width={1536}
                  height={1024}
                  className="absolute inset-0 size-full object-cover"
                />
                <span className="absolute bottom-4 left-4 border border-foreground bg-background px-3 py-1 text-xs font-bold uppercase">
                  Imagen de la porción completa
                </span>
              </div>
              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase text-primary">{selectedDish.category}</p>
                  <DialogTitle className="pr-8 font-display text-4xl uppercase leading-none sm:text-5xl">
                    {selectedDish.name}
                  </DialogTitle>
                  <DialogDescription className="mt-5 text-lg leading-relaxed text-muted-foreground">
                    {selectedDish.detail}
                  </DialogDescription>
                </div>

                <div className="my-8 grid grid-cols-2 border-y border-foreground">
                  <div className="border-r border-foreground py-5 pr-5">
                    <p className="text-xs font-bold uppercase text-muted-foreground">Porción real</p>
                    <p className="mt-1 font-display text-2xl uppercase">{selectedDish.portion}</p>
                  </div>
                  <div className="py-5 pl-5">
                    <p className="text-xs font-bold uppercase text-muted-foreground">Ideal para</p>
                    <p className="mt-1 font-display text-2xl uppercase">{selectedDish.serves}</p>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm font-bold uppercase">Cantidad</p>
                    <div className="flex items-center border-2 border-foreground">
                      <Button variant="ghost" size="icon" className="rounded-none" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Quitar una unidad">
                        <Minus />
                      </Button>
                      <span className="grid h-9 w-10 place-items-center border-x-2 border-foreground font-bold">{quantity}</span>
                      <Button variant="ghost" size="icon" className="rounded-none" onClick={() => setQuantity((value) => value + 1)} aria-label="Añadir una unidad">
                        <Plus />
                      </Button>
                    </div>
                  </div>
                  <Button variant="order" size="lg" className="h-14 w-full justify-between px-5 text-base uppercase" onClick={addToOrder}>
                    Añadir al pedido <span>${(selectedDish.price * quantity).toFixed(2)}</span>
                  </Button>
                  <p className="mt-4 text-center text-xs text-muted-foreground">Preparado al momento · 15–20 min</p>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}