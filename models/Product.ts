import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: {
    alt: {
      type: String,
    },
    src: {
      type: String,
    },
    srcset: {
      type: String,
    },
  },
  price: String,
  description: String,
  discountedPrice: String,
  thumbnails: [String],
});

export const Product =
  mongoose.models.Product ?? mongoose.model("Product", productSchema);
