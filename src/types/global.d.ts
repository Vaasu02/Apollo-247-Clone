declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: unknown | null;
    promise: Promise<unknown> | null;
  } | undefined;
}

export {}; 