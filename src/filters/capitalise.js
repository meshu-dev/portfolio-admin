let capitalise = value => {
  if (typeof value === "string" && value.length > 0) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return "";
};

export default capitalise;
