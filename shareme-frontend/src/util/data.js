export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == "${userId}"]`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match "${searchTerm}*" || category match "${searchTerm}*" || about match "${searchTerm}*"] {

    image {
      asset -> {
        url
        }
      },

    _id,

    destination,

      postedBy -> {
        userName,
        _id,
        image
      },

      save[] {
      _key,
      postedBy -> {
        userName,
        _id,
        image,
      }
    },

    comment[] {
      _key,
      postedBy -> {
        userName,
        _id,
        image,
        comment,
      },
    },

  }`;
  return query;
};

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {

    image {
      asset -> {
        url
        }
      },

    _id,

    destination,

      postedBy -> {
        userName,
        _id,
        image
      },

      save[] {
      _key,
      postedBy -> {
        userName,
        _id,
        image,
      }
    },

    comment[] {
      _key,
      postedBy -> {
        userName,
        _id,
        image,
        comment,
      },
    },

  }`;
