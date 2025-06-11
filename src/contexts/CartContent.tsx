import React, { createContext, useState } from "react";
import toast from "react-hot-toast";

interface ContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductsProps) => void;
    removeItemCart: (product: CartProps) => void;
    removeTotalItemCart: (product: CartProps) => void;
  total: string;
}

interface ChildrenProps {
  children: React.ReactNode;
}

interface CartProps {
  id: number;
  price: number;
  cover: string;
  description: string;
  title: string;
  amount: number;
  total: number;
}

interface ProductsProps {
  id: number;
  cover: string;
  price: number;
  title: string;
  description: string;
}

export const CartContext = createContext({} as ContextData);

export default function CartProvider({ children }: ChildrenProps) {
  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState("");

  function addItemCart(newItem: ProductsProps) {
    const IndexItem = cart.findIndex((item) => item.id === newItem.id);

    if (IndexItem !== -1) {
      let cartList = cart;

      cartList[IndexItem].amount = cartList[IndexItem].amount + 1;
      cartList[IndexItem].total = cartList[IndexItem].amount * cartList[IndexItem].price;
        setCart(cartList);
        totalResultCart(cartList)
      return;
    }

    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };

    setCart((products) => [...products, data]);
      totalResultCart([...cart, data]);
      toast.success("Adicionado com sucesso")
  }

  function removeItemCart(product: CartProps) {
    const IndexItem = cart.findIndex((item) => item.id === product.id);

    if (cart[IndexItem].amount > 1) {
      let cartList = cart;
      cartList[IndexItem].amount = cartList[IndexItem].amount - 1;
      cartList[IndexItem].total =
        cartList[IndexItem].total - cartList[IndexItem].price;
      setCart(cartList);
      totalResultCart(cartList);
      return;
    }

    const removeItem = cart.filter((item) => item.id !== product.id);
    setCart(removeItem);
      totalResultCart(removeItem);
      toast.success("Removido com sucesso.")
    }
    
    function removeTotalItemCart(product: CartProps) {


    const removeItem = cart.filter((item) => item.id !== product.id);
    setCart(removeItem);
        totalResultCart(removeItem);
        toast.success("Removido com sucesso.")
  }

  function totalResultCart(items: CartProps[]) {
    let myCart = items;
    let result = myCart.reduce((acc, obj) => {
      return acc + obj.total;
    }, 0);
    const formatedResult = result.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setTotal(formatedResult);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemCart,
        removeItemCart,
              total,
        removeTotalItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
