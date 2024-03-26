import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

function RatingStars({ rating }) {
  if (!rating) rating = 1.1;
  const filledStars = Math.floor(rating / 2);
  const halfStar = rating % 1 !== 0;

  const stars = [];

  for (let i = 0; i < filledStars; i++) {
    stars.push(<StarIcon key={i} style={{ color: "goldenrod" }} />);
  }

  if (halfStar) {
    stars.push(<StarHalfIcon key="half" style={{ color: "goldenrod" }} />);
  }

  for (let i = filledStars + (halfStar ? 1 : 0); i < 5; i++) {
    stars.push(<StarBorderIcon key={i} style={{ color: "goldenrod" }} />);
  }

  return <span>{stars}</span>;
}

export default RatingStars;
