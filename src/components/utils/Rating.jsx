import { useEffect, useState } from "react";

function Rating(props) {
  const [rating, setRating] = useState(0);
  useEffect(() => {
    fetch(
      `https://api.hamroelectronics.com.np/api/v1/rating/product/${props.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setRating(data.data[0].rating);
      });
  }, []);

  const [hover, setHover] = useState(0);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hover || rating) ? "text-yellow-500" : "  text-gray-300"
            }
            onClick={() => {
              props.rate(props.id, index);
              setRating(index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="text-2xl">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

export default Rating;
