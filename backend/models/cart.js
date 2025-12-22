import mongoose, {Schema} from "mongoose";

const cartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        Ref: "Product",
        required: true
    },
    name: String,
    image: String,
    price: Number,
    quantity: {
        type: Number,
        default: 1
    },
}, {_id: false});

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    guestId: String,
    product: {
        type: [cartItemSchema],
        default: []
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
},{timestamps: true});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;