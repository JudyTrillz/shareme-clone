import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../util/data";
import SignIn from "./SignIn";

const Feed = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  const [pins, setPins] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) return <Spinner message="We are adding new ideas to your feed" />;
  if (!pins?.length)
    return <h2 className="text-red-500 font-bold">No pins available.</h2>;
  return (
    <div className="">
      {pins && <MasonryLayout pins={pins} />}
      {!user && <SignIn message={"Sign in to create post"} />}
    </div>
  );
};

Feed.propTypes = {
  user: PropTypes.object,
};

export default Feed;
