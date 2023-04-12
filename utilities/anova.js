export default (population, samples) => {
  const populationMean = population.reduce((result, value, index) => {
    const n = index + 1;
    return (1 / n) * value + ((n - 1) / n) * result;
  }, 0);
  const sampleMeans = samples.map((sample) => {
    return sample.reduce((result, value, index) => {
      const n = index + 1;
      return (1 / n) * value + ((n - 1) / n) * result;
    }, 0);
  });
  const sumOfSquares = sampleMeans.reduce((result, sampleMean, index) => {
    const square =
      (sampleMean - populationMean) * (sampleMean - populationMean);
    return result + samples[index].length * square;
  }, 0);
  const errorSumOfSquares = samples.reduce((result1, sample, index) => {
    const sampleSse = sample.reduce((result2, value) => {
      const square =
        (value - sampleMeans[index]) * (value - sampleMeans[index]);
      return result2 + square;
    }, 0);
    return result1 + sampleSse;
  }, 0);
  const totalSumOfSquares = sumOfSquares + errorSumOfSquares;
  const degreesOfFreedom = samples.length - 1;
  const errorDegreesOfFreedom = samples.flat().length - samples.length;
  const totalDegreesOfFreedom = samples.flat().length - 1;
  const meanSquares = totalSumOfSquares / degreesOfFreedom;
  const errorMeanSquares = errorSumOfSquares / errorDegreesOfFreedom;
  const fStatistic = meanSquares / errorMeanSquares;
  return {
    sumOfSquares:
      typeof sumOfSquares === "number" && sumOfSquares ? sumOfSquares : "N/A",
    errorSumOfSquares:
      typeof errorSumOfSquares === "number" && errorSumOfSquares
        ? errorSumOfSquares
        : "N/A",
    totalSumOfSquares:
      typeof totalSumOfSquares === "number" && totalSumOfSquares
        ? totalSumOfSquares
        : "N/A",
    degreesOfFreedom:
      typeof degreesOfFreedom === "number" && degreesOfFreedom
        ? degreesOfFreedom
        : "N/A",
    errorDegreesOfFreedom:
      typeof errorDegreesOfFreedom === "number" && errorDegreesOfFreedom
        ? errorDegreesOfFreedom
        : "N/A",
    totalDegreesOfFreedom:
      typeof totalDegreesOfFreedom === "number" && totalDegreesOfFreedom
        ? totalDegreesOfFreedom
        : "N/A",
    meanSquares:
      typeof meanSquares === "number" && meanSquares ? meanSquares : "N/A",
    errorMeanSquares:
      typeof errorMeanSquares === "number" && errorMeanSquares
        ? errorMeanSquares
        : "N/A",
    fStatistic:
      typeof fStatistic === "number" && fStatistic ? fStatistic : "N/A",
  };
};
