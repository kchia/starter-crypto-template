import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ErrorBoundary, useErrorHandler } from "react-error-boundary";

import { Button, ErrorFallback, Loader } from "../../../common/core";
import { STATUS } from "../../../common/constants";
import { logError } from "../../../common/utils";

import { list } from "../favorites.service.js";

import styles from "./list.module.css";
export default function FavoritesList() {
  const [favorites, setFavorites] = useState([]);
  const [status, setStatus] = useState(STATUS.idle);
  const handleError = useErrorHandler();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadFavorites() {
      if (status === STATUS.idle) {
        try {
          setStatus(STATUS.loading);
          setFavorites(await list(abortController.signal));
        } catch ({ message }) {
          handleError(
            new Error(
              `Sorry, we're having trouble loading your favorites: ${message}`
            )
          );
        } finally {
          setStatus(STATUS.idle);
        }
      }
    }
    loadFavorites();

    return () => abortController.abort();
  }, []);

  function handleEditButtonClick(id) {
    history.push(`/favorites/${id}/edit`);
  }

  const favoritesRows = favorites.map(
    ({
      originalAssetId,
      assetContractAddress,
      id,
      imageUrl,
      name,
      nickname,
      notes,
      type,
    }) => {
      const urlPath =
        type === "coin"
          ? `/coins/${originalAssetId}`
          : `/collectibles/${assetContractAddress}/${originalAssetId}`;

      return (
        <tr className={styles.tableRow} key={originalAssetId}>
          <td className={styles.tableCell}>{id}</td>
          <td className={styles.tableCell}>
            <Link to={urlPath}>
              <img className={styles.image} src={imageUrl} alt={name} />
            </Link>
          </td>
          <td className={styles.tableCell}>
            <Link to={urlPath}>{name}</Link>
          </td>
          <td className={styles.tableCell}>{type}</td>
          <td className={styles.tableCell}>{nickname}</td>
          <td className={styles.tableCell}>{notes}</td>
          <td className={styles.tableCellButtonContainer}>
            <Button text="edit" handleClick={() => handleEditButtonClick(id)} />
          </td>
        </tr>
      );
    }
  );

  const favoritesTable = (
    <table>
      <thead className={styles.tableHeader}>
        <tr>
          {["id", "image", "name", "type", "nickname", "notes", "actions"].map(
            (header) => (
              <th className={styles.tableHeaderCell} key={header}>
                {header}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody align="center">{favoritesRows}</tbody>
    </table>
  );

  const content =
    status === STATUS.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary
        children={favoritesTable}
        FallbackComponent={ErrorFallback}
        onReset={() => {
          setFavorites([]);
          setStatus(STATUS.idle);
        }}
        onError={logError}
      />
    );

  return (
    <section className={styles.container}>
      <h2>Favorites</h2>
      {content}
    </section>
  );
}
