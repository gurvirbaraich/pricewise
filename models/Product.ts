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
  title: String,
  price: String,
  productUrl: String,
  description: String,
  thumbnails: [String],
  discountedPrice: String,
});

export const Product =
  mongoose.models.Product ?? mongoose.model("Product", productSchema);
