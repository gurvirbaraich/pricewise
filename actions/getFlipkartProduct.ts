import { Product } from "@/models/Product";
import axios from "axios";
import cheerio, { Element, CheerioAPI } from "cheerio";

export default async function getFlipkartProduct(productUrl: string) {
  try {
    const existingProduct = await Product.findOne({
      productUrl: productUrl.split("?")[0],
    });

    if (existingProduct) {
      return existingProduct._id;
    }
  } catch (error) {
    console.error((error as { message: string }).message);
  }

  const request = axios.post(
    `${process.env.BROWSERLESS_BASEPATH}${process.env.BROWSERLESS_APIKEY}`,
    {
      url: productUrl,
    }
  );

  const contents = (await request).data;
  const $ = cheerio.load(contents);

  const productDetails = {
    title: "",
    image: getImageDetails($),
    price: getProductPrice($),
    productUrl: productUrl.split("?")[0],
    description: getProductDescription($),
    discountedPrice: getDiscountedPrice($),
    thumbnails: await getThumbnailImages($),
  };

  productDetails.title = productDetails.image?.alt!;

  const product = await Product.findOneAndUpdate(
    { productUrl: productDetails.productUrl },
    {
      $set: productDetails,
    },
    { upsert: true, returnDocument: "after" },
  );

  return product._id;
}

function getImageDetails($: CheerioAPI) {
  const mainImageTag = $(
    '[style="height: inherit; width: inherit;"] img'
  ).attr() as null | {
    alt: string;
    src: string;
    srcset: string;
  };

  return !mainImageTag
    ? null
    : {
        alt: mainImageTag.alt,
        src: mainImageTag.src,
        srcset: mainImageTag.srcset,
      };
}

async function getThumbnailImages($: CheerioAPI) {
  const thumbnailImagesTag = $(
    '[style="transform: translateY(0px);"] img'
  ).get();

  // @ts-ignore
  const images = await getIndividualThumbnailImage($, thumbnailImagesTag);

  return images;
}

function getIndividualThumbnailImage(
  $: CheerioAPI,
  thumbnailImagesTag: Element[]
) {
  return new Promise((resolve, reject) => {
    const images: string[] = [];

    thumbnailImagesTag.map((element, _) => {
      const imageAttr = element.attribs.src;

      if (imageAttr) {
        images.push(imageAttr);
      }

      if (_ === thumbnailImagesTag.length - 1) {
        resolve(images);
      }
    });
  });
}

function getProductPrice($: CheerioAPI) {
  return $("._3I9_wc._2p6lqe").text().trim();
}

function getDiscountedPrice($: CheerioAPI) {
  return $("._30jeq3._16Jk6d").text().trim();
}

function getProductDescription($: CheerioAPI) {
  return $("._1mXcCf.RmoJUa").text().trim();
}
