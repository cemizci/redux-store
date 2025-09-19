import { useMemo, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory,selectOnlyInStock,selectPriceMax,selectPriceMin,selectSort,selectQuery } from '../features/filters/selectors';
import { setCategory, setOnlyInStock, setQuery, setSort, setPriceRange, resetFilters } from '../features/filters/filtersSlice';
 

const Toolbar = ({ categories = [] }) => {

    const dispatch = useDispatch();
    const query = useSelector(selectQuery);
    const sort = useSelector(selectSort);
    const category = useSelector(selectCategory);
    const onlyInStock = useSelector(selectOnlyInStock);
    const priceMin = useSelector(selectPriceMin);
    const priceMax = useSelector(selectPriceMax);

    const [localQuery, setLocalQuery] = useState(query);
    useMemo(() => {
        const id = setTimeout(() => dispatch(setQuery(localQuery)),250);
        return () => clearTimeout(id);
    }, [localQuery, dispatch]);

  return (
    <div className='mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 bg-gray-100 p-2 rounded-md'>
        <input
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder='Ara..'
            className='border rounded-xl px-3 py-2 w-full'
        />

        <select 
        value={category} 
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className='border rounded-xl px-3 py-2'
        >
            <option value="all">Tüm kategoriler</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        
        {/* Sıralama */}
        <select
        value={sort}
        onChange={(e) => dispatch(setSort(e.target.value))}
        className='border rounded-xl px-3 py-2'
        >
            <option value="relevance">Önerilen</option>
            <option value="priceAsc">Fiyat ↑</option>
            <option value="priceDesc">Fiyat ↓</option>
            <option value="titleAsc">İsim A-Z</option>
            <option value="titleDesc">isim Z-A</option>
        </select>

        {/* Stok + Fiyat aralığı */}
        <div className="flex items-center gap-3 w-full">
            <label className="inline-flex items-center gap-2">
                <input 
                 type= "checkbox"
                 checked={onlyInStock}
                 onChange={(e) => dispatch(setOnlyInStock(e.target.checked))}
                />
                <span className="text-sm">Sadece stoktakiler</span>
            </label>

            <input
            type='number'
            min={0}
            value={priceMin}
            onChange={(e) => dispatch(setPriceRange([Number(e.target.value) || 0, priceMax]))}
            className="w-20 border rounded-xl px-2 py-1 text-sm"
            placeholder="Min"
            />
            <span className="text-sm">–</span>
            <input
             type='number'
             min={0}
             value={priceMax}
             onChange={(e) => dispatch(setPriceRange([priceMin, Number(e.target.value) || 0]))}
             className="w-20 border rounded-xl px-2 py-1 text-sm"
             placeholder="Max"
            />
            <button 
             onClick={() => dispatch(resetFilters())}
             className='ml-auto border rounded-xl px-3 py-2 text-sm w-full'
            >Sıfırla</button>
        </div>

    </div>
  )
}

export default Toolbar