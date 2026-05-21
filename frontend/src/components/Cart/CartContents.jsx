import { useDispatch, useSelector } from 'react-redux';
// import { updateCartItemQuantity, removeFromCart } from '../redux/slices/cartslice';
import { MdDeleteSweep } from 'react-icons/md';
import { updateCartItemQuantity, removeFromCart } from '../../redux/slices/cartSlice';


const CartContents = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.cart);

    const handleQuantity = (productId, action, currentQty) => {
        const newQty = action === "plus" ? currentQty + 1 : currentQty - 1;
        if (newQty < 1) return;
        dispatch(updateCartItemQuantity({ productId, quantity: newQty }));
    };

    const handleRemove = (productId) => {
        dispatch(removeFromCart({ productId }));
    };

    return (
        <div>
            {cart?.products?.map((product, index) => (
                <div key={index} className="flex items-start justify-between py-4 border-b">
                    <div className="flex items-start">
                        <img
                            src={product.images?.[0]?.url}
                            alt={product.name}
                            className="w-28 h-24 object-cover mr-4 rounded"
                        />
                    </div>
                    <div>
                        <h3>{product.name}</h3>
                        <div className="flex items-center mt-4">
                            <button
                                onClick={() => handleQuantity(product.productId, "minus", product.quantity)}
                                className="border rounded px-2 py-1 text-xl font-medium cursor-pointer"
                            >-</button>
                            <span className="mx-4">{product.quantity}</span>
                            <button
                                onClick={() => handleQuantity(product.productId, "plus", product.quantity)}
                                className="border rounded px-2 py-1 text-xl font-medium cursor-pointer"
                            >+</button>
                        </div>
                    </div>
                    <div>
                        <p className="font-medium">Rs. {product.price.toLocaleString()}</p>
                        <button onClick={() => handleRemove(product.productId)} className="cursor-pointer">
                            <MdDeleteSweep className="h-6 w-6 mt-3 text-red-600" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartContents;

