import Button from "@/components/Button";
import { Product } from "@/models/Product";
import Image from "next/image";

export default async function Products() {
  const products = await Product.find({}, {}, { limit: 10 });
  const totalProducts = await Product.count();

  return (
    totalProducts && (
      <main>
        <div className="px-4 py-4 flex gap-3 flex-col">
          {/* Render Each Product */}

          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 flex flex-col gap-2 rounded-md overflow-hidden shadow-sm">
              <div className="flex items-center justify-center my-8">
                <Image
                  width={208}
                  height={208}
                  src={product.image.src}
                  alt={product.image.alt}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-medium">{product.title}</h3>
                <p className="line-clamp-2 text-base mb-3 text-gray-700">{product.description}</p>

                <Button mode="default">Track</Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    )
  );
}
