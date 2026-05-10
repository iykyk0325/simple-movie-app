import PropTypes from "prop-types";
import styles from "./MovieInfo.module.css";
import formatRuntime from "../utils/formatRuntime";

const MovieInfo = ({ movie }) => {
  const description =
    movie.description_full ||
    movie.description_intro ||
    "등록된 줄거리 정보가 없습니다.";

  return (
    <section className={styles.movieInfo}>
      <div className={styles.card}>
        <img
          src={movie.large_cover_image || movie.medium_cover_image}
          alt={movie.title}
          className={styles.cover}
        />
        <div className={styles.content}>
          <h1 className={styles.title}>{movie.title}</h1>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <h2 className={styles.sectionTitle}>개봉 연도</h2>
              <p className={styles.detailValue}>{movie.year || "연도 정보 없음"}</p>
            </div>
            <div className={styles.detailItem}>
              <h2 className={styles.sectionTitle}>상영 시간</h2>
              <p className={styles.detailValue}>{formatRuntime(movie.runtime)}</p>
            </div>
            <div className={styles.detailItem}>
              <h2 className={styles.sectionTitle}>언어</h2>
              <p className={styles.detailValue}>
                {movie.language?.toUpperCase() || "언어 정보 없음"}
              </p>
            </div>
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>줄거리</h2>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.genreSection}>
            <h2 className={styles.sectionTitle}>장르</h2>
            {movie.genres?.length ? (
              <ul className={styles.genres}>
                {movie.genres.map((genre) => (
                  <li key={genre} className={styles.genre}>
                    {genre}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyText}>장르 정보가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

MovieInfo.propTypes = {
  movie: PropTypes.shape({
    description_full: PropTypes.string,
    description_intro: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    language: PropTypes.string,
    large_cover_image: PropTypes.string,
    medium_cover_image: PropTypes.string,
    runtime: PropTypes.number,
    title: PropTypes.string,
    year: PropTypes.number,
  }).isRequired,
};

export default MovieInfo;
