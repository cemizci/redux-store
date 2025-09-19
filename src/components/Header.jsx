import { useSelector, useDispatch } from "react-redux";
import { selectTotalQuantity } from "../features/cart/selectors";
import { toggleCart, toggleFavorites } from "../features/ui/uiSlice";
import { FiShoppingCart } from "react-icons/fi";
import { MdFavorite } from "react-icons/md";
import React from 'react'

const Header = () => {

  const  totalQuantity  = useSelector(selectTotalQuantity);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div><h1 className="text-xl font-semibold tracking-tight">redux-store</h1></div>
        <div className="flex items-center gap-2">
          <MdFavorite onClick={() => dispatch(toggleFavorites())} className="text-lg text-center"/>
          <button
          onClick={() => dispatch(toggleCart())}
          className="relative inline-flex items-center gap-2 rounded-2xl border px-4 py-2 hover:shadow"
        >
          <FiShoppingCart className="text-lg" />
          <span>Sepet</span>
          {totalQuantity > 0 && (
            <span className="ml-1 rounded-full text-xs px-2 py-0.5 bg-black text-white">
              {totalQuantity}
            </span>
          )}
        </button>
        </div>
      </div>
    </header>
  )
}

export default Header
