import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAdById } from "../../../api";
import { getMissingFields } from "../../../utils/getMissingFields";

export const useAdDetails = () => {
  const { id } = useParams<{ id: string }>();
  const idNumber = Number(id);

  const query = useQuery({
    queryKey: ["ad", id],
    queryFn: () => getAdById(idNumber!),
    enabled: !!id,
  });

  const missingFields = query.data ? getMissingFields(query.data) : [];

  return {
    ...query,
    missingFields,
    id,
  };
};