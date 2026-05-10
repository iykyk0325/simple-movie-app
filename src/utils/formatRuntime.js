const formatRuntime = (runtime) => {
  if (!runtime) {
    return "상영 시간 정보 없음";
  }

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (!hours) {
    return `${minutes}분`;
  }

  return `${hours}시간 ${minutes}분`;
};

export default formatRuntime;
