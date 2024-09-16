import dateFormat from "dateformat";

const calculateAge = (activatedAt, plantAge) => {
    let plantDate = new Date(activatedAt);
    let currentDate = new Date();

    let differenceTime = currentDate.getTime() - plantDate.getTime();

    return plantAge + Math.round(differenceTime / (1000 * 3600 * 24));
  };

  const calculateHarvestDate = (activatedAt, plantAge, harvestAge) => {
    let plantDate = new Date(activatedAt);
    let age = harvestAge - plantAge;
    plantDate.setDate(plantDate.getDate() + age);

    return dateFormat(plantDate, "d mmmm yyyy");
  };

const plantHelper = {
    calculateAge,
    calculateHarvestDate,
};

export default plantHelper;
