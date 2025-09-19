import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import CartDrawer from "../components/CartDrawer";
import { products } from "../data/products.js";
import FavoritesDrawer from "../components/FavoritesDrawer.jsx";
import Toolbar from "../components/Toolbar.jsx";
import { useMemo, useEffect, useState } from 'react'
import Pagination from "../components/Pagination.jsx";
import { useSearchParams } from "react-router-dom";

const Home = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFormUrl = Number(searchParams.get("page") || 1);
  const PAGE_SIZE = 8;
  const [page, setPage] = useState(pageFormUrl);

  useEffect(() => {
    const next = Number(searchParams.get("page") || 1)
    setPage(next)
  },[searchParams]);

  const onPageChange = (nextPage) => {
    const sp = new URLSearchParams(searchParams.toString())
    if(nextPage <= 1) sp.delete("page"); else sp.set("page", String(nextPage));
    setSearchParams(sp);
    window.scrollTo({top: 0, behavior: "smooth"})
  }

  const categories = useMemo(
    () => Array.from(new Set(products.map(p => p.category))).sort(), [])

    const total = useMemo(() => products.length, [products]);

  return (
    <div>
        <Header/>
        <main className="max-w-6xl mx-auto px-4 py-6">
            <h2 className="text-xl font-semibold mb-4">Ürünler</h2>
            <Toolbar categories={categories} />
            <ProductGrid products={products} page={page} pageSize={PAGE_SIZE}/>
            <Pagination page={page} pageSize={PAGE_SIZE} total={products.length} onPageChange={onPageChange}/>
        </main>
         <CartDrawer /> 
         <FavoritesDrawer />
    </div>
  )
}

export default Home