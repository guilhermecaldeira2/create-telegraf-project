interface ICLI {
  main: (rawArgs: string[]) => Promise<void>;
  registerArgs: () => void;
}

export default ICLI;
