import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import ProgressBar from "react-bootstrap/ProgressBar";

import { useHistory } from "react-router-dom";

import styles from "./card.module.css";
export default function ProjectCard({
  project: {
    id,
    imageUrl,
    logo,
    title,
    tagline,
    description,
    slug,
    fundingRaised,
    fundingGoal,
    fundingPercentage,
    labels,
  },
}) {
  const history = useHistory();

  function handleCardClick() {
    history.push(`/projects/${id}`);
  }

  const labelBadges = labels.map((label, index) => (
    <Badge bg="primary" key={`${label}-${index}`}>
      {label}
    </Badge>
  ));

  return (
    <Card className={styles.card} onClick={handleCardClick}>
      <Card.Img
        alt={title}
        className={styles.img}
        variant="top"
        src={imageUrl}
      />
      <Card.Body>
        <Card.Title className="text-center">{title}</Card.Title>
        <Card.Subtitle className="text-center">{tagline}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <article>
          <Card.Text>
            {fundingRaised} of {fundingGoal} in $MIA raised
          </Card.Text>
          <ProgressBar
            now={fundingPercentage}
            label={`${fundingPercentage}%`}
          />
        </article>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem className={styles.listGroupItem}>
          {labelBadges}
        </ListGroupItem>
      </ListGroup>
      <Card.Footer>Launching Soon</Card.Footer>
    </Card>
  );
}
