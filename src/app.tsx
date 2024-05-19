import { useState } from "react";
import { AppType } from "../functions/api/[[route]]";
import { hc } from "hono/client";
import { useQuery } from "@tanstack/react-query";

const client = hc<AppType>("/");

export default function App() {
  const [name, setName] = useState("world");

  const helloQuery = useQuery({
    queryKey: ["hello", name],
    queryFn: () =>
      client.api.hello.$get({ query: { name } }).then((res) => res.json()),
    placeholderData: (previousData) => previousData,
  });

  return (
    <div>
      <h1 style={{ opacity: helloQuery.isPlaceholderData ? 0.5 : 1 }}>
        {helloQuery.data?.message}
      </h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
