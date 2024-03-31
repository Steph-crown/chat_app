const displayPhotos = [
  "avatar1.svg",
  "avatar2.svg",
  "avatar3.svg",
  "avatar4.svg",
  "avatar5.svg",
  "avatar6.svg",
];

const getDummyPhoto = (id: number) => {
  const pictureIndex = id % displayPhotos.length;
  return displayPhotos[pictureIndex];
};

export { getDummyPhoto };
