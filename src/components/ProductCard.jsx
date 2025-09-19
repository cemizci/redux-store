import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { FiPlus, FiCheck } from "react-icons/fi";
import { addToFavorites, removeFromFavorites } from '../features/favorites/favoritesSlice';
import { MdOutlineFavorite, MdFavoriteBorder  } from "react-icons/md";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  const dispatch = useDispatch();  
  const {id, title, price, image, stock = 1 } = product;
    const isInCart = useSelector((s) =>
    s.cart.items.some((i) => String(i.id) === String(id))
  );
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === product.id);
  const FALLBACK_IMG = "https://placehold.co/150x150?text=No+Image";

  const toggleFavorite = () => {
    if (isFavorite){
      dispatch(removeFromFavorites(product.id));
    }else {
      dispatch(addToFavorites({id, title, price, image}))     
    }
  }

  return (
    <div className="rounded-2xl border overflow-hidden hover:shadow-sm transition">
        <Link to={`/product/${id}`} className="block">
          <img src={image} alt={title} className="w-full aspect-square object-cover" onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMG;
  }}/>
        </Link>
        <div className="p-4 flex items-center justify-between">
        <div>
          <Link to={`/product/${id}`} className='font-medium hover:underline'>{title}</Link>
          <p className="text-sm opacity-70">{price} ₺</p>
        </div>
        <button disabled={isInCart}
          onClick={() => 
            dispatch(addToCart({ id, title, price, image, stock }))
           }
          className="inline-flex items-center gap-1 border rounded-xl px-3 py-2 hover:bg-gray-50"
        >
          {isInCart ? (
            <>
              <FiCheck /> Sepette
            </>
          ) : (
            <>
              <FiPlus /> Ekle
            </>
          )}
        </button>
        {isFavorite 
          ? <MdOutlineFavorite onClick={toggleFavorite} className="text-red-500 text-xl cursor-pointer" /> 
          : <MdFavoriteBorder onClick={toggleFavorite} className="cursor-pointer text-xl" />
        }
        
      </div>
    </div>
  )
}

export default ProductCard