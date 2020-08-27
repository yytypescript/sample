const channels = new Set<string>(["general", "random"]);

export class ChannelAPI {
  async create({ name }: { readonly name: string }): Promise<void> {
    if (channels.has(name)) {
      throw new Error(`channel already exists`);
    }
    channels.add(name);
  }

  async list(): Promise<Array<string>> {
    return Array.from(channels.values()).sort();
  }
}
