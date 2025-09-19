import { useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../features/cart/cartSlice";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartItem = ({ item }) => {

    const dispatch = useDispatch();
    const {id, title, price, image, quantity } = item;
  return (
    <div className="flex gap-3 border-b pb-3">
      <img src={image} alt={title} className="w-16 h-16 rounded object-cover" onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/64x64?text=No+Img";
  }} />
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium">{title}</h4>
          <button onClick={() => dispatch(removeFromCart(id))} className="opacity-60 hover:opacity-100">
            <FiTrash2 />
          </button>
        </div>
        <p className="text-sm opacity-70">{price} ₺</p>
        <div className="mt-2 inline-flex items-center gap-2">
          <button className="border rounded-full p-1" onClick={() => dispatch(decrementQuantity(id))}><FiMinus /></button>
          <span className="min-w-6 text-center">{quantity}</span>
          <button className="border rounded-full p-1" onClick={() => dispatch(incrementQuantity(id))}><FiPlus /></button>
        </div>
      </div>
    </div>
  )
}

export default CartItem