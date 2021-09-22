import { client } from "../../api/client";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/collectibles`;

async function list(signal) {
  try {
    const assets = await client.get(API_URL, { signal });
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

async function read(id, signal) {
  try {
    const {
      token_id: originalAssetId,
      permalink,
      image_url: imageUrl,
      name,
      collection: { name: collectionName, description: collectionDescription },
    } = await client.get(`${API_URL}/${id}/`, { signal });

    return {
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
