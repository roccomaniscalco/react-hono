import { useEffect, useState } from "react";
import { AppType } from "../functions/api/[[route]]";
import { hc } from "hono/client";

const client = hc<AppType>("/");

export default function App() {
  const [message, setMessage] = useState<any>(null);

  useEffect(() => {
    const getMessage = async () => {
      const res = await client.api.hello.$get({ query: { name: "world" } });
      if (res.ok) {
        const data = await res.json();
        setMessage(data.message);
      }
    };
    getMessage();
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
