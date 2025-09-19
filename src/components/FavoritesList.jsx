import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromFavorites } from '../features/favorites/favoritesSlice';

const FavoritesList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const FALLBACK_IMG = "https://placehold.co/100x100?text=No+Image";

  if (favorites.length === 0) return <p>Favoriler boş.</p>;

  return (
    <div>
        <h2 className="text-xl font-bold mb-3">Favoriler</h2>
        <ul className='space-y-2'>
          {favorites.map((item) => (
    <li key={item.id} className='p-2 border rounded-md w-full'>
        <div className='flex items-center gap-3 justify-around'>
            <img
                src={item.image || FALLBACK_IMG}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">{item.price}₺</p>
              </div>
              <button onClick={() => dispatch(removeFromFavorites(item.id))}
                className="px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600"
                >
                  Kaldır
              </button>
        </div>
    </li>
))}

        </ul>
    </div>
  )
}

export default FavoritesList