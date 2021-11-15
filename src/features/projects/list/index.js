import { useEffect } from "react";
import { ErrorBoundary, useErrorHandler } from "react-error-boundary";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ErrorFallback, Loader } from "../../../common/core";
import { STATUS } from "../../../common/constants";
import { logError } from "../../../common/utils";

import {
  projectsReset,
  fetchProjects,
  selectAllProjects,
  selectFetchProjectsStatus,
} from "../projects.slice";

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

export default function ProjectsList() {
  const projects = useSelector(selectAllProjects);
  const status = useSelector(selectFetchProjectsStatus);
  const dispatch = useDispatch();
  const handleError = useErrorHandler();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadProjects() {
      try {
        await dispatch(fetchProjects(abortController.signal)).unwrap();
      } catch ({ message }) {
        handleError(
          new Error(
            `Sorry, we're having trouble loading the projects: ${message}`
          )
        );
      }
    }
    loadProjects();

    return () => abortController.abort();
  }, []);

  const projectsRows = projects.map(
    (
      {
        originalAssetId,
        imageUrl,
        name,
        price,
        marketCap,
        priceChange1d,
        rank,
      },
      index
    ) => {
      const priceChangeElementClassName =
        priceChange1d < 0 ? negative : positive;

      return (
        <tr className={tableRow} key={originalAssetId}>
          <td className={tableCell}>{rank}</td>
          <td className={tableCell}>
            <Link to={`/projects/${originalAssetId}`}>
              <img className={image} src={imageUrl} alt={name} />
            </Link>
          </td>
          <td>
            <Link to={`/projects/${originalAssetId}`}>
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

  const projectsTable = (
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
      <tbody align="center">{projectsRows}</tbody>
    </table>
  );

  const content =
    status === STATUS.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary
        children={projectsTable}
        FallbackComponent={ErrorFallback}
        onReset={() => dispatch(projectsReset())}
        onError={logError}
      />
    );

  return (
    <section className={container}>
      <h2>Projects</h2>
      {content}
    </section>
  );
}
