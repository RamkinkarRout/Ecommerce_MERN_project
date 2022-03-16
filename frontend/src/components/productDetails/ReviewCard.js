import React from "react";
import ReactStars from "react-rating-stars-component";
import profilepng from "../../images/man.png";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#ffa41c",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className='reviewCard'>
      <img src={profilepng} alt='User' />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className='reviewCardComment'>
        {review.comment}
      </span>
    </div>
  );
};

export default ReviewCard;
