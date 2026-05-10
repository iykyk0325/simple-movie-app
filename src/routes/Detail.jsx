import { useParams } from "react-router";
import { useEffect, useState } from "react";
import MovieInfo from "../component/MovieInfo";
import styles from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://movies-api.accel.li/api/v2/movie_details.json?movie_id=${id}`,
    )
      .then((response) => response.json())
      .then((json) => {
        setMovie(json.data.movie);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>로딩중...</div>
      ) : (
        <MovieInfo movie={movie} />
      )}
    </div>
  );
};

export default Detail;
