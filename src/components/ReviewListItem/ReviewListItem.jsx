import PropTypes from 'prop-types';

const ReviewListItem = ({ author, content }) => {
  return (
    <div className="reviewItem">
      <h3>{author}</h3>
      <p>{content}</p>
    </div>
  );
};

ReviewListItem.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ReviewListItem;