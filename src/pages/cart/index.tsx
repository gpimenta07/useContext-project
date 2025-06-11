import { useContext } from "react";
import { CartContext } from "../../contexts/CartContent";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Cart() {
    const { cart, addItemCart, removeItemCart, removeTotalItemCart, total } = useContext(CartContext);
    const navigate = useNavigate()
    

    function finallyBuy() {
        toast.success("Compra realizada com sucesso.")
        navigate("/")
    }
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

          <div className="space-y-6">
              {cart.length === 0 &&(
                  <div>
                      <p className="mb-5">Ops, seu carrinho está vazio!</p>
                      <Link className="bg-amber-400 py-2 px-4 rounded-lg" to="/">Acesse os produtos</Link>
                  </div>
              )}
        {cart.map((product) => (
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              <img
                src={product.cover}
                alt={product.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h2 className="font-semibold text-lg">{product.title}</h2>

                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => removeItemCart(product)} className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
                    −
                  </button>

                            <span className="text-sm font-medium">{product.amount }</span>

                  <button onClick={() => addItemCart(product)} className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
                    +
                  </button>
                </div>

                <p className="text-sm font-medium text-blue-700 mt-2">
                            {product.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                  })} x {product.amount} = {product.total.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                  })}
                </p>
              </div>
            </div>
            <button onClick={() => removeTotalItemCart(product)} className="text-red-600 cursor-pointer hover:underline text-sm">
              Remover
            </button>
          </div>
        ))}

        <div className="flex justify-between items-center pt-6 border-t">
          <p className="text-xl font-bold">
                      Total: <span className="text-blue-700">{total }</span>
          </p>
          <button onClick={() => finallyBuy()} className="bg-green-600 text-white cursor-pointer px-6 py-2 rounded hover:bg-green-700 transition">
            Finalizar Compra
          </button>
        </div>
      </div>
    </section>
  );
}
