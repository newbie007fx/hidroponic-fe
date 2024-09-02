import dateFormat from "dateformat";

const calculateAge = (activedAt, plantAge) => {
    let plantDate = new Date(activedAt);
    let currentDate = new Date();

    let differenceTime = currentDate.getTime() - plantDate.getTime();

    return plantAge + Math.round(differenceTime / (1000 * 3600 * 24));
  };

  const calculateHarvestDate = (activedAt, plantAge, harvestAge) => {
    let plantDate = new Date(activedAt);
    let age = harvestAge - plantAge;
    plantDate.setDate(plantDate.getDate() + age);

    return dateFormat(plantDate, "d mmmm yyyy");
  };

const plantHelper = {
    calculateAge,
    calculateHarvestDate,
};

export default plantHelper;
