import { cookies } from "next/headers";

import { ItemCard } from "@/shopping-cart";
import { Product, products } from "@/products";
import { WidgetItem } from "@/components";

export const metadata = {
  title: "Carrito de compras",
  description: "SEO Title",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

type Cart = { [id: string]: number };

//* Función para obtener los productos en el carrito
const getProductsInCart = (cart: Cart) => {
  const productsInCart: ProductInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((prod) => prod.id === id);
    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }

  return productsInCart;
};

export default async function CartPage() {
  const cookieStore = await cookies();
  const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}") as Cart;
  const productsInCart = getProductsInCart(cart);

  const totalToPay = productsInCart.reduce((acc, product) => acc + product.product.price * product.quantity, 0);

  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>

      <hr className="my-4" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map((product) => (
            <ItemCard
              key={product.product.id}
              product={product.product}
              quantity={product.quantity}
            />
          ))}
        </div>

        <div className="flex flex-col w-full">
          <WidgetItem title="Total a pagar">
            <div className="flex justify-center gap-4 mt-2">
              <h3 className="text-3xl font-bold text-gray-700">${(totalToPay * 1.15).toFixed(2)}</h3>
            </div>

            <div className="font-bold text-center text-gray-500">Impuestos 15%: ${(totalToPay * 0.15).toFixed(2)}</div>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
