"use client";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then(r => {
  if (!r.ok) throw new Error("Failed to fetch " + url);
  return r.json();
});
export default function useLiveStats() {
  const { data, error, isLoading, mutate } = useSWR("/api/live-stats", fetcher, {
    refreshInterval: 1000,
    dedupingInterval: 500,
    revalidateOnFocus: false,
  });
  return { data, error, isLoading, mutate };
}
