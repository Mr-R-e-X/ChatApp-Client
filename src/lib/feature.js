import moment from "moment";

const fileFormat = (url = "") => {
  const fileExtension = url.split(".").pop();
  if (
    fileExtension === "mp4" ||
    fileExtension === "webm" ||
    fileExtension === "ogg"
  )
    return "video";

  if (fileExtension === "mp3" || fileExtension === "wav") return "audio";
  if (
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "png" ||
    fileExtension === "gif" ||
    fileExtension === "webp"
  )
    return "image";

  return "file";
};

const format = (url = "") => url.split(".").pop();

const transformImg = (url = "", width = 250) => {
  if (url) {
    url = url.replace("upload/", `upload/w_${width},dpr_auto/`);
  }

  return url;
};

const lastSevenDays = () => {
  const currentDate = moment();
  const lastSevenDays = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, "days");
    const dayName = dayDate.format("ddd");
    lastSevenDays.unshift(dayName);
  }
  return lastSevenDays;
};

const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get) {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export {
  fileFormat,
  transformImg,
  lastSevenDays,
  format,
  getOrSaveFromStorage,
};
