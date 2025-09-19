import React from 'react'
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { products } from "../data/products";
import { FiPlus, FiCheck } from "react-icons/fi";

const ProductDetail = () => {
 const { id } = useParams();
 const product = products.find(p => String(p.id) === String(id));
  const isInCart = useSelector((s) =>
    s.cart.items.some((i) => String(i.id) === String(id))
  );
 const dispatch = useDispatch();

 if(!product){
    return(<div className='max-w-4xl mx-auto px-4 py-8'>
        <p>Ürün Bulunamadı..!</p>
        <Link to="/" className='underline'>Ana sayfaya dön</Link>
    </div>)
 }

 const {title,price,image,stock=0, description} = product;

  return (
    <div>
        <div className='max-w-5xl mx-auto px-4 py-6'>
            <Link to="/" className='text-sm opacity-70 hover:underline'>← Kataloğa dön</Link>
            <div className='grid md:grid-cols-2 gap-6 mt-4'>
                <img src={image} alt='title' className='w-full rounded-2xl border object-fill'></img>
                <div>
                    <h1 className="text-2xl font-semibold">{title}</h1>
                    <p className="text-xl mt-2">{price} ₺</p>
                    <p className="text-sm opacity-70 mt-1">Stok: {stock}</p>
                    <p className='mt-4 leading-relaxed'>
                        {description || "Bu ürün için henüz detay açıklma eklenmedi"}
                    </p>
                    <button 
                    className='mt-6 bg-black text-white rounded-xl px-4 py-2 flex gap-2 items-center'
                    onClick={() => dispatch(addToCart({ id, title, price, image, stock }))}
                    >{isInCart ? (
                        <>
                          <FiCheck /> Sepette
                        </>
                    ): (
                        <>
                          Sepete Ekle
                        </>
                    )}</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetail