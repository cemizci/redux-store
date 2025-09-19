import { useDispatch, useSelector } from "react-redux";
import {selectItems, selectTotalAmount } from "../features/cart/selectors";
import { clearCart } from "../features/cart/cartSlice";
import { closeCart } from "../features/ui/uiSlice.js"
import CartItem from "./CartItem";
import { FiX } from "react-icons/fi";


const CartDrawer = () => {

  const isOpen = useSelector(s => s.ui.cartOpen);
  const items = useSelector(selectItems);
  const totalAmount   = useSelector(selectTotalAmount);
  const dispatch = useDispatch();


  return (
    <>
        {/* backdrop */}
          <div
        onClick={() => dispatch(closeCart())}
        className={`fixed inset-0 bg-black/30 transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
       {/* panel */}
       <aside className={`fixed right-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-xl transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold">Sepet</h3>
                 <button onClick={() => dispatch(closeCart())} className="border rounded-full p-2"><FiX /></button>
             </div>
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <p className="opacity-60">Sepetiniz boş.</p>
          ) : (
            items.map(i => <CartItem key={i.id} item={i} />)
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Toplam</span>
            <span className="text-lg font-semibold">{totalAmount} ₺</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => dispatch(clearCart())} className="flex-1 border rounded-xl px-4 py-2">Temizle</button>
            <button className="flex-1 bg-black text-white rounded-xl px-4 py-2">Ödeme</button>
          </div>
        </div>
       </aside>
    </>
  )
}

export default CartDrawer