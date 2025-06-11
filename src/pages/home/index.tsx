import { useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { CartContext } from "../../contexts/CartContent";

export default function Home() {
  interface ProductsProps {
    id: number;
    cover: string;
    price: number;
    title: string;
    description: string;
  }

    const [products, setProducts] = useState<ProductsProps[]>([]);
    const { addItemCart } = useContext(CartContext);
  

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
    }
    getProducts();
  }, []);
    
    function handleAddItem(product: ProductsProps) {
        addItemCart(product)
    }

  return (
    <section className="w-full mx-auto max-w-7xl px-4 py-8">
      <p className="text-center font-medium text-3xl mt-1 mb-5 italic">
        Produtos em alta
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg border-gray-300 p-4 flex flex-col justify-between"
          >
            <div>
              <img
                className="w-full h-48 object-cover rounded-md mb-4"
                src={product.cover}
                alt={product.title}
              />
              <h1 className="font-semibold text-lg mb-2">{product.title}</h1>
              <p className="text-sm text-gray-600 line-clamp-3">
                {product.description}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="font-bold text-blue-700">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              
                  <button 
                    onClick={() => handleAddItem(product)}
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer"
                  >
                    Comprar
                  </button>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
