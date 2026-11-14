export const parseCommand = (value: string) => {
  const raw = value.trim();
  const [name = "", ...args] = raw.toLowerCase().split(/\s+/);
  return { raw, name, args, argument: args.join(" ") };
};
