import { client } from "../../api/client";
import { formatNumber } from "../../common/utils";

async function list(signal) {
  try {
    const { coins } = await client.get(
      "https://api.coinstats.app/public/v1/coins?skip=0&limit=20&currency=USD",
      { signal }
    );

    return coins.map(
      ({
        id: originalAssetId,
        icon: imageUrl,
        name,
        price,
        priceChange1d,
        marketCap,
        rank,
      }) => ({
        originalAssetId,
        imageUrl,
        name,
        price: formatNumber(price),
        priceChange1d,
        marketCap: formatNumber(marketCap),
        rank,
      })
    );
  } catch (error) {
    return Promise.reject(error);
  }
}

async function read({ id, signal }) {
  try {
    const {
      coin: {
        availableSupply,
        icon: imageUrl,
        id: originalAssetId,
        marketCap,
        name,
        price,
        priceChange1d,
        rank,
        symbol,
        totalSupply,
        twitterUrl,
        websiteUrl,
      },
    } = await client.get(
      `https://api.coinstats.app/public/v1/coins/${id}?currency=USD`,
      { signal }
    );

    return {
      availableSupply: formatNumber(availableSupply),
      originalAssetId,
      imageUrl,
      marketCap: formatNumber(marketCap),
      name,
      price: formatNumber(price),
      priceChange1d,
      rank,
      symbol,
      type: "coin",
      totalSupply: formatNumber(totalSupply),
      twitterUrl,
      websiteUrl,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export { list, read };
