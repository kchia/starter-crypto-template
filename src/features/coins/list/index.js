import { useState, useEffect } from "react";
import { ErrorBoundary, useErrorHandler } from "react-error-boundary";
import { Link } from "react-router-dom";

import { ErrorFallback, Loader } from "../../../common/core";
import { STATUS } from "../../../common/constants";
import { logError } from "../../../common/utils";

import { list } from "../coins.service.js";

import {
  container,
  tableHeader,
  tableHeaderCell,
  tableRow,
  tableCell,
  image,
  negative,
  positive,
} from "./list.module.css";

export default function CoinsList() {
  const [coins, setCoins] = useState([]);
  const [status, setStatus] = useState(STATUS.idle);
  const handleError = useErrorHandler();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCoins() {
      if (status === STATUS.idle) {
        try {
          setStatus(STATUS.loading);
          setCoins(await list(abortController.signal));
        } catch ({ message }) {
          handleError(
            new Error(
              `Sorry, we're having trouble loading the coins: ${message}`
            )
          );
        } finally {
          setStatus(STATUS.idle);
        }
      }
    }
    loadCoins();

    return () => abortController.abort();
  }, []);

  const coinsRows = coins.map(
    ({
      originalAssetId,
      imageUrl,
      name,
      price,
      marketCap,
      priceChange1d,
      rank,
    }) => {
      const priceChangeElementClassName =
        priceChange1d < 0 ? negative : positive;

      return (
        <tr className={tableRow} key={originalAssetId}>
          <td className={tableCell}>{rank}</td>
          <td className={tableCell}>
            <Link to={`/coins/${originalAssetId}`}>
              <img className={image} src={imageUrl} alt={name} />
            </Link>
          </td>
          <td>
            <Link to={`/coins/${originalAssetId}`}>
              <span>{name}</span>
            </Link>
          </td>
          <td>${price}</td>
          <td>${marketCap}</td>
          <td className={priceChangeElementClassName}>{priceChange1d}%</td>
        </tr>
      );
    }
  );

  const coinsTable = (
    <table>
      <thead className={tableHeader}>
        <tr>
          <th className={tableHeaderCell}>#</th>
          <th className={tableHeaderCell}>ICON</th>
          <th className={tableHeaderCell}>NAME</th>
          <th className={tableHeaderCell}>PRICE</th>
          <th className={tableHeaderCell}>MCAP</th>
          <th className={tableHeaderCell}>24H</th>
        </tr>
      </thead>
      <tbody align="center">{coinsRows}</tbody>
    </table>
  );

  const content =
    status === STATUS.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary
        children={coinsTable}
        FallbackComponent={ErrorFallback}
        onReset={() => {
          setCoins([]);
          setStatus(STATUS.idle);
        }}
        onError={logError}
      />
    );

  return (
    <section className={container}>
      <h2>Top 20 Coins by Market Cap</h2>
      {content}
    </section>
  );
}
