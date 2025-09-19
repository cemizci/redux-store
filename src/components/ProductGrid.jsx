import ProductCard from "./ProductCard";
import { useSelector } from 'react-redux';
import { selectFilters } from "../features/filters/selectors"
import { useMemo } from  "react"

const normalize = (s) => s.toLocaleLowerCase("tr-TR").normalize("NFKD").replace(/\p{Diacritic}/gu, "")

const ProductGrid = ({ products, page, pageSize }) => {

  const { query, sort, category, onlyInStock, priceMin, priceMax } = useSelector(selectFilters);
  const visible = useMemo(() => {
    const q = normalize(query || "");

      let arr = products.filter(p => {
        const matchesQuery = 
          q.length === 0 || normalize(p.title).includes(q);
        const matchesCategory = 
          category === "all" || p.category === category;
        const matchesStock =
         !onlyInStock || (p.stock ?? 0) > 0;
        const matchesPrice = 
         p.price >= (priceMin ?? 0) && p.price <= (priceMax ?? Infinity);
        return matchesQuery && matchesCategory && matchesStock && matchesPrice;
      })

      switch (sort) {
        case "priceAsc": arr.sort((a,b) => a.price - b.price); break;
        case "priceDesc": arr.sort((a,b) => b.price - a.price); break;
        case "titleAsc": arr.sort((a,b) => normalize(a.title).localeCompare(normalize(b.title), "tr-TR")); break; 
        case "titleDesc": arr.sort((a,b) => normalize(b.title).localeCompare(normalize(a.title), "tr-TR")); break;
        case "relevance":   
        default:
          if(q) {
            arr.sort((a,b) => {
              const as = normalize(a.title).indexOf(q);
              const bs = normalize(b.title).indexOf(q);
              return (as === -1) - (bs === -1) || as- bs;
            });
          }
      }
      return arr;
  }, [products, query, sort, category, onlyInStock, priceMin, priceMax]);

  const total = visible.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = visible.slice(start,end);
  //const totalPages = Math.max(1, Math.ceil(total/pageSize))

  return (
    
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {pageItems.map(p => <ProductCard key={p.id} product={p} />)}
        {total === 0 && (
          <div className="col-span-full text-sm opacity-70">
          Sonuç bulunamadı. Filtreleri gevşetmeyi deneyin.
        </div>
        )}
    </div>
    
  )
  
}

export default ProductGrid