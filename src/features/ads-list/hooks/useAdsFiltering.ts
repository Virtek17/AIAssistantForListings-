import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { getAds } from "../../../api";

export const useAdsFiltering = (pageSize: number = 10) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [onlyNeedsRevision, setOnlyNeedsRevision] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt_desc");
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  const queryParams = {
    q: debouncedSearch,
    categories: selectedCategories.join(","),
    needsRevision: onlyNeedsRevision || undefined,
    skip: (currentPage - 1) * pageSize,
    limit: pageSize,
    sortColumn: sortBy.split("_")[0] as "title" | "createdAt" | "price",
    sortDirection: sortBy.split("_")[1] as "asc" | "desc",
  };

  const query = useQuery({
    queryKey: ["ads", queryParams],
    queryFn: () => getAds(queryParams),
  });

  const handleReset = () => {
    setSearch("");
    setSelectedCategories([]);
    setOnlyNeedsRevision(false);
    setCurrentPage(1);
    setSortBy("createdAt_desc");
  };

  const updateSearch = (val: string) => { setSearch(val); setCurrentPage(1); };
  const updateSort = (val: string) => { setSortBy(val); setCurrentPage(1); };
  const updateCategories = (vals: string[]) => { setSelectedCategories(vals); setCurrentPage(1); };
  const updateRevision = (val: boolean) => { setOnlyNeedsRevision(val); setCurrentPage(1); };

  return {
    state: { search, selectedCategories, onlyNeedsRevision, currentPage, sortBy, isCategoryOpen },
    actions: { 
      setSearch: updateSearch, 
      setSortBy: updateSort, 
      setSelectedCategories: updateCategories, 
      setOnlyNeedsRevision: updateRevision, 
      setCurrentPage, 
      setIsCategoryOpen, 
      handleReset 
    },
    query
  };
};