import { feApi, type schemas } from "@drvida/fe-api";

export const getSimulations = async (
  inputData: schemas["SimulationsInput"],
): Promise<{
  data: schemas["SimulationsOutput"] | undefined;
  error: string | undefined;
}> => {
  const { data, error } = await feApi({
    baseUrl: "http://localhost:3123",
  }).POST("/simulations", {
    body: inputData,
  });

  return {
    data,
    error: error?.description,
  };
};
