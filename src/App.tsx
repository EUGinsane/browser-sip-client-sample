import { useState } from "react";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { Inviter, Registerer, UserAgent } from "sip.js";

function App() {
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    // e.
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(e.currentTarget);

    const server = data.get("server") as string;
    const sourceSip = data.get("sourceSip") as string;
    const username = data.get("username") as string;
    const password = data.get("password") as string;
    const destinationSip = data.get("destinationSip") as string;

    try {
      const userAgentOption = {
        authorizationUsername: username,
        authorizationPassword: password,
        transportOptions: { server },
        uri: UserAgent.makeURI(sourceSip),
      };

      const userAgent = new UserAgent({
        transportOptions: userAgentOption.transportOptions,
      });

      const registerer = new Registerer(userAgent);

      await userAgent.start();
      await registerer.register();

      const inviter = new Inviter(userAgent, UserAgent.makeURI(destinationSip)!);

      await inviter.invite();

      setLoading(false);
      setConnected(true);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Input
          disabled={loading}
          name="server"
          label="WS/WSS Server:"
          placeholder="Ex: {ws,wss}://{host}:{port}/{path}"
        />
        <Input
          disabled={loading}
          name="sourceSip"
          label="Source SIP Address:"
          placeholder="Ex: sip:something@example.com"
        />
        <Input
          disabled={loading}
          name="username"
          label="Username (optional):"
          placeholder="Ex: username"
        />
        <Input
          disabled={loading}
          name="password"
          label="Password (optional):"
          placeholder="Ex: password"
        />
        <Input
          disabled={loading}
          name="destinationSip"
          label="Destination SIP Address:"
          placeholder="Ex: sip:something@example.com"
        />

        <Button disabled={loading || connected} className="mt-2" type="submit">
          {loading ? "Calling" : connected ? "Connected" : "Call"}
        </Button>
      </form>

      {error && <p className="text-red-600 mt-20">{JSON.stringify(error)}</p>}
    </main>
  );
}

export default App;
