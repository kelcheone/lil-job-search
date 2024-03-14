export const checkImageURL = (url) => {
  if (!url) return false;
  else {
    const pattern = new RegExp(
      "^https?:\\/\\/(?:www\\.)?.+\\.(?:png|jpg|jpeg|gif|svg|webp|ico|bmp)$"
    );
    return pattern.test(url);
  }
};
