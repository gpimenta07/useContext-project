import { useContext } from "react";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router";
import { CartContext } from "../../contexts/CartContent";

export default function Header() {
  const { cartAmount } = useContext(CartContext);
  return (
    <header className="bg-amber-300 w-full px-5">
      <nav className="w-full flex justify-between items-center h-15 mx-auto">
        <div>
          <Link className="text-black font-medium text-2xl" to="/">
            Pet<span className="italic font-bold text-blue-500">Shop</span>
          </Link>
        </div>
        <div>
          <div className="bg-white opacity-90 hover:scale-105 duration-200 p-1 rounded">
            <Link className="relative" to="/cart">
              <BsCartPlus size={22} color="#000000" />
              {cartAmount > 0 && (
                <div className="absolute flex items-center justify-center w-5 h-5 -top-3 -right-2 px-2 bg-blue-500 rounded-full">
                  {cartAmount}
                </div>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
