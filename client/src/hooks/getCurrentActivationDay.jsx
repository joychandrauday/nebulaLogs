const getCurrentActivationDay = (launchDate) => {
  const currentDate = new Date();
  const launch = new Date(launchDate);
  
  // Ensure the date is parsed correctly
  if (isNaN(launch.getTime())) {
    throw new Error("Invalid date format. Use YYYY-MM-DD.");
  }

  const timeDifference = currentDate - launch;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
};

export default getCurrentActivationDay;
