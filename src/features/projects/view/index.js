import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { ErrorBoundary, useErrorHandler } from "react-error-boundary";
import { useSelector, useDispatch } from "react-redux";

import { STATUS } from "../../../common/constants";
import { Button, ErrorFallback, Loader } from "../../../common/core";
import { logError } from "../../../common/utils";

import {
  projectReset,
  selectProject,
  fetchProject,
  selectFetchProjectStatus,
} from "../project.slice";

import styles from "./view.module.css";

export default function ProjectView() {
  const project = useSelector(selectProject);
  const status = useSelector(selectFetchProjectStatus);
  const { id } = useParams();
  const handleError = useErrorHandler();
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadProject() {
      try {
        await dispatch(
          fetchProject({ id, signal: abortController.signal })
        ).unwrap();
      } catch ({ message }) {
        handleError(
          new Error(
            `Sorry, we're having trouble loading the project: ${message}`
          )
        );
      }
    }
    loadProject();

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
  } = project;

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

  function handleVoteNowButtonClick() {
    // open modal here
  }

  const projectCard = (
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
      <Button text="vote now" handleClick={handleVoteNowButtonClick} />
    </Card>
  );

  const content =
    status === STATUS.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary
        children={projectCard}
        FallbackComponent={ErrorFallback}
        onReset={() => dispatch(projectReset())}
        onError={logError}
      />
    );

  return <section className={styles.container}>{content}</section>;
}
