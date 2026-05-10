import { useState, useEffect } from "react";
import Movie from "../component/Movie";
import styles from "./Home.module.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const sortOptions = [
    "title",
    "year",
    "rating",
    "download_count",
    "like_count",
    "date_added",
  ];
  const sortOptionLabels = {
    title: "제목",
    year: "개봉 연도",
    rating: "평점",
    download_count: "다운로드",
    like_count: "좋아요",
    date_added: "최근 추가",
  };
  const [selectedSortOption, setSelectedSortOption] =
    useState("download_count");
  const handleSelectedSortOptionChange = (e) => {
    setSelectedSortOption(e.target.value);
  };

  const orderOptions = ["desc", "asc"];
  const orderOptionLabels = {
    desc: "내림차순",
    asc: "오름차순",
  };
  const [selectedOrderOption, setSelectedOrderOption] = useState("desc");
  const handleSelectedOrderOptionChange = (e) => {
    setSelectedOrderOption(e.target.value);
  };

  const ratingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedRatingOption, setSelectedRatingOption] = useState(1);
  const handleSelectedRatingOptionChange = (e) => {
    setSelectedRatingOption(e.target.value);
  };

  useEffect(() => {
    fetch(
      `https://movies-api.accel.li/api/v2/list_movies.json?minimum_rating=${selectedRatingOption}&sort_by=${selectedSortOption}&order_by=${selectedOrderOption}`,
    )
      .then((response) => response.json())
      .then((json) => {
        setMovies(json.data.movies);
        console.log(json.data.movies);
        setLoading(false);
      });
  }, [selectedSortOption, selectedRatingOption, selectedOrderOption]);

  return (
    <div className={styles.container}>
      {loading ? (
        <h1 className={styles.loader}>Loading...</h1>
      ) : (
        <div className={styles.content}>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label htmlFor="minimum_rating" className={styles.filterLabel}>
                최소 평점
              </label>
              <select
                id="minimum_rating"
                className={styles.select}
                value={selectedRatingOption}
                onChange={handleSelectedRatingOptionChange}
              >
                {ratingOptions.map((opt) => {
                  return (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label htmlFor="sort_by" className={styles.filterLabel}>
                정렬 기준
              </label>
              <select
                id="sort_by"
                className={styles.select}
                value={selectedSortOption}
                onChange={handleSelectedSortOptionChange}
              >
                {sortOptions.map((opt) => {
                  return (
                    <option key={opt} value={opt}>
                      {sortOptionLabels[opt]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label htmlFor="order_by" className={styles.filterLabel}>
                정렬 방향
              </label>
              <select
                id="order_by"
                className={styles.select}
                value={selectedOrderOption}
                onChange={handleSelectedOrderOptionChange}
              >
                {orderOptions.map((opt) => {
                  return (
                    <option key={opt} value={opt}>
                      {orderOptionLabels[opt]}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={styles.movies}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
