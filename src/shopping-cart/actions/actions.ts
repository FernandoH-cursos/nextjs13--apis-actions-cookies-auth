/* 
? Forma de la cookie del carrito de compras guardando la cantidad de productos que se tienen en el carrito por id del producto
* cookie: cart
* {
* 'uuid-123-1': 4,
* 'uuid-123-2': 1,
* 'uuid-123-3': 2,
* }
*/

import { getCookie, hasCookie, setCookie } from "cookies-next"


// Acción para obtener cookie del carrito de compras
export const getCookieCart = (): { [id: string]: number } => {
  //* Valida si la cookie existe
  if(hasCookie('cart')) {
    const cookieCart = JSON.parse(getCookie('cart') as string || '{}');

    return cookieCart;
  }
  
  //* Si no hay cookie, se retorna un objeto vacío
  return {};
}


// Acción para agregar un producto al carrito de compras
export const addProductToCart = (id: string) => { 
  const cookieCart = getCookieCart();

  //* Valida si el producto ya existe en el carrito
  if (cookieCart[id]) {
    cookieCart[id] = cookieCart[id] + 1;
  } else {
    //* Si no existe, se agrega al carrito con 1 unidad
    cookieCart[id] = 1;
  }

  //* Se actualiza la cookie con el nuevo carrito
  setCookie('cart', JSON.stringify(cookieCart));
    
}

// Acción para eliminar un producto del carrito de compras
export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();

  //* Valida si el producto existe en el carrito
  if (cookieCart[id]) {
    cookieCart[id] = cookieCart[id] - 1;
  }

  //* Se actualiza la cookie con el nuevo carrito
  setCookie('cart', JSON.stringify(cookieCart));
}