import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../util/data";
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching for pins ..." />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <p className="mt-10 text-center text-xl">No pins found</p>
      )}
    </div>
  );
};

Search.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
};

export default Search;
