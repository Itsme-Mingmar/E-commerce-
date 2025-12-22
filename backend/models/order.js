import mongoose,{Schema} from "mongoose";

const orderItemSchema = new Schema({
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

const orderSchema = new Schema(
  {
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "user", required: true 
    },
    items: { type: 
        [orderItemSchema], 
        required: true 
    },

    shippingAddress: {
      address: { type: String, required: true },
      city:    { type: String, required: true },
      country: { type: String, required: true }
    },

    paymentMethod: { type: String, required: true },

    paymentInfo: {                
      type: Schema.Types.Mixed
    },

    totalPrice: { type: Number, required: true },

    isPaid:   { type: Boolean, default: false },
    paidAt:   { type: Date },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
