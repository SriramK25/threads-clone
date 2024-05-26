export default function postTime(createdAt) {
  if (!createdAt) return "-";

  const created = new Date(createdAt);
  const current = new Date();

  // Calculate the difference in milliseconds between the two dates
  const timeDifference = current.getTime() - created.getTime();

  // Convert milliseconds to days and hours
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const difference = `${daysDifference ? daysDifference + "d" : ""} ${
    hoursDifference
      ? hoursDifference + (hoursDifference > 1 ? "hrs" : "hr")
      : "Just now"
  }`;

  return difference;
}
