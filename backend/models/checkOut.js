import mongoose,{Schema} from "mongoose";

const checkoutItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: String,
    image: String,
    price: Number,
    quantity: {
        type: Number,
        default: 1
    }
},{_id: false});

const checkoutSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    checkoutItems: {
        type: [checkoutItemSchema],
        required: true
    },
    shippingAddress: {
        address: {
            type: String,
            required:true
        },
        city: {
            type: String,
            required:true
        },
        country: {
            type: String,
            required:true
        },
        
    },
    paymentMethod: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
    type: String,
    enum: ["initiated", "awaiting-payment", "expired"],
    default: "initiated     "
    },
    expiresAt: { 
        type: Date, 
        default: () => Date.now() + 1000 * 60 * 60 
    }

},{timestamps: true});
const Checkout = mongoose.model("Checkout", checkoutSchema);
export default Checkout;