import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { closeFavorites } from "../features/ui/uiSlice";
import FavoritesList from './FavoritesList';

const FavoritesDrawer = () => {

  const dispatch = useDispatch();
  const isOpen = useSelector((s) => s.ui.favoritesOpen);
  const favorites = useSelector((s) => s.favorites.items);



  return (
    <div>
      <div
        onClick={() => dispatch(closeFavorites())}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl p-2 transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Favoriler ({favorites.length})</h2>
          <button
            onClick={() => dispatch(closeFavorites())}
            className="px-2 py-1 rounded-md hover:bg-gray-100"
          >
            Kapat
          </button>
        </div>
        <FavoritesList />  
      </aside>
    </div>
  )
}

export default FavoritesDrawer