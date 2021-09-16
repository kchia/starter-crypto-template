import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { ErrorBoundary, useErrorHandler } from "react-error-boundary";
import PropTypes from "prop-types";

import { STATUS } from "../../../common/constants";
import { Button, ErrorFallback, Loader } from "../../../common/core";
import { logError } from "../../../common/utils";

import { read } from "../coins.service.js";

import styles from "./view.module.css";

export default function CoinView({ handleFavoriteChange }) {
  const [coin, setCoin] = useState({});
  const [status, setStatus] = useState(STATUS.idle);
  const { id } = useParams();
  const handleError = useErrorHandler();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCoin() {
      if (status === STATUS.idle) {
        try {
          setStatus(STATUS.loading);
          setCoin(await read({ id, signal: abortController.signal }));
        } catch ({ message }) {
          handleError(
            new Error(
              `Sorry, we're having trouble loading the coin: ${message}`
            )
          );
        } finally {
          setStatus(STATUS.idle);
        }
      }
    }
    loadCoin();

    return () => abortController.abort();
  }, [id]);

  const {
    availableSupply,
    imageUrl,
    marketCap,
    name,
    price,
    priceChange1d,
    rank,
    symbol,
    totalSupply,
    twitterUrl,
    websiteUrl,
  } = coin;

  const priceChange1dElement =
    priceChange1d < 0 ? (
      <span className={styles.negative}> ({priceChange1d}%)</span>
    ) : (
      <span className={styles.positive}> (+{priceChange1d}%)</span>
    );

  const keyMetrics = [
    {
      name: "Rank",
      value: rank,
    },
    { name: "MCap", value: marketCap },
    { name: "Total Supply", value: totalSupply },
    { name: "Available Supply", value: availableSupply },
  ].map(({ name, value }) => (
    <ListGroupItem className={styles.listGroupItem} key={name}>
      <span>{name}: </span>
      <span>{value}</span>
    </ListGroupItem>
  ));

  function handleSaveToFavoritesButtonClick() {
    handleFavoriteChange(coin);
    history.push(`/favorites/new`);
  }

  const coinCard = (
    <Card className={styles.card}>
      <Card.Img
        alt={name}
        className={styles.img}
        variant="top"
        src={imageUrl}
      />
      <Card.Body>
        <Card.Title className="text-center">
          {name} ({symbol})
        </Card.Title>
        <Card.Subtitle className="text-center">
          ${price}
          {priceChange1dElement}
        </Card.Subtitle>
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroupItem className={styles.listGroupItem}>
          KEY METRICS
        </ListGroupItem>
        {keyMetrics}
      </ListGroup>

      <Card.Body className="text-center">
        {twitterUrl && <Card.Link href={twitterUrl}>Twitter</Card.Link>}
        <Card.Link href={websiteUrl}>Website</Card.Link>
      </Card.Body>
      <Button
        text="save to favorites"
        handleClick={handleSaveToFavoritesButtonClick}
      />
    </Card>
  );

  const content =
    status === STATUS.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary
        children={coinCard}
        FallbackComponent={ErrorFallback}
        onReset={() => {
          setCoin({});
          setStatus(STATUS.idle);
        }}
        onError={logError}
      />
    );

  return <section className={styles.container}>{content}</section>;
}

CoinView.propTypes = {
  handleFavoriteChange: PropTypes.func.isRequired,
};
