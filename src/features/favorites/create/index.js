import PropTypes from "prop-types";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useErrorHandler } from "react-error-boundary";

import { Form, Loader } from "../../../common/core";
import { STATUS } from "../../../common/constants";

import { create } from "../favorites.service.js";

export default function FavoriteCreate({
  favorite: { name, imageUrl, ...favorite },
}) {
  const [status, setStatus] = useState(STATUS.idle);
  const history = useHistory();
  const handleError = useErrorHandler();

  async function handleFormSubmit(form) {
    if (status === STATUS.idle) {
      try {
        setStatus(STATUS.loading);
        await create({
          name,
          imageUrl,
          ...favorite,
          ...form,
        });

        history.push("/favorites");
      } catch ({ message }) {
        handleError(
          new Error(`Sorry, we're having trouble saving: ${message}`)
        );
      } finally {
        setStatus(STATUS.idle);
      }
    }
  }

  const config = {
    headerText: `Add ${name} to your favorites`,
    imageAltText: name,
    imageUrl,
  };

  const renderLoader = status === STATUS.loading && <Loader />;

  return (
    <section>
      {renderLoader}
      <Form config={config} handleFormSubmit={handleFormSubmit} />
    </section>
  );
}

FavoriteCreate.propTypes = {
  favorite: PropTypes.exact({
    originalAssetId: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    type: PropTypes.string,
    assetContractAddress: function (props, propName, componentName) {
      if (props.type === "NFT" && !props[propName])
        return new Error(
          `Invalid prop ${propName}:${props[propName]} supplied to ${componentName}. Validation failed.`
        );
    },
  }),
};
