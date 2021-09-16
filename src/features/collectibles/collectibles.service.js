import { client } from "../../api/client";

async function list(signal) {
  try {
    const { assets } = await client.get(
      "https://api.opensea.io/api/v1/assets?limit=50",
      { signal }
    );
    return assets.map(
      ({
        asset_contract: { address: assetContractAddress },
        collection: { name: collectionName },
        description,
        token_id: originalAssetId,
        image_url: imageUrl,
        name,
        permalink: url,
      }) => ({
        assetContractAddress,
        collectionName,
        description,
        originalAssetId,
        imageUrl,
        name,
        url,
      })
    );
  } catch (error) {
    return Promise.reject(error);
  }
}

async function read(assetContractAddress, id, signal) {
  try {
    const {
      token_id: originalAssetId,
      permalink,
      image_url: imageUrl,
      name,
      collection: { name: collectionName, description: collectionDescription },
    } = await client.get(
      `https://api.opensea.io/api/v1/asset/${assetContractAddress}/${id}/`,
      { signal }
    );
    return {
      assetContractAddress,
      collectionName,
      collectionDescription,
      imageUrl,
      name,
      originalAssetId,
      permalink,
      type: "NFT",
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

export { list, read };
