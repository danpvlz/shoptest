import Head from "next/head";
import Image from "next/image";
import React from "react";

const ProductPage = ({ product }) => {
  function addProductJsonLd() {
    return {
      __html: `{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "${product.title}",
        "image": ${product.image?.url},
        "description": ${product.description},
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": ${product.price},
          "availability": "https://schema.org/InStock"
        }
      }
    `,
    };
  }
  return (
    <div>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} key="desc" />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image?.url} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {product.image ? (
        <Image
          alt={product.title}
          src={product.image.url}
          width={product.image.width}
          height={product.image.height}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const products = await fetch(
    "https://run.mocky.io/v3/e05e2d5f-47fe-4d76-8f5c-1712d5f37fd8"
  ).then((response) => response.json());
  const product = products.length - 1 < id ? products[0] : products[id];

  return {
    props: {
      product: {
        title: product.title,
        description: product.description,
        price: product.priceRangeV2.maxVariantPrice.amount ?? 0,
        image: product.featuredImage,
      },
    },
  };
}

export default ProductPage;
