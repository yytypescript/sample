const host = "http://localhost:3001";

export class ChannelAPI {
  async create({ name }: { readonly name: string }): Promise<void> {
    const response = await fetch(`${host}/channels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (response.ok) {
      return;
    }
    const error = await response.json();
    throw new Error(error.message);
  }

  async list(): Promise<Array<string>> {
    const response = await fetch(`${host}/channels`);
    const data = await response.json();
    if (response.ok) {
      return (data as Array<{ name: string }>).map((channel) => channel.name);
    } else {
      throw new Error(data.message);
    }
  }
}
