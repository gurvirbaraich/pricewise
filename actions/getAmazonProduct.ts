import { Product } from "@/models/Product";
import axios from "axios";
import cheerio, { Element, CheerioAPI } from "cheerio";

export default async function getAmazonProduct(productUrl: string) {
  const request = axios.post(
    `${process.env.BROWSERLESS_BASEPATH}${process.env.BROWSERLESS_APIKEY}`,
    {
      url: productUrl,
    }
  );

  const contents = (await request).data;
  const $ = cheerio.load(contents);

  const productDetails = {
    image: getImageDetails($),
    price: getProductPrice($),
    description: getProductDescription($),
    discountedPrice: getDiscountedPrice($),
    thumbnails: await getThumbnailImages($),
  };

  const product = await Product.create(productDetails);

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
  return $("._3I9_wc._2p6lqe").text();
}

function getDiscountedPrice($: CheerioAPI) {
  return $("._30jeq3._16Jk6d").text();
}

function getProductDescription($: CheerioAPI) {
  return $("._1mXcCf.RmoJUa").text();
}
