import { ConnectOptions } from "mongoose";

export const dbConnection = {
  buildUri: (
    { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST }: Record<string, string>,
    IS_LOCAL: boolean
  ): string => {
    const protocol = IS_LOCAL ? "mongodb+srv" : "mongodb";
    const username = encodeURIComponent(DB_USERNAME);
    const password = encodeURIComponent(DB_PASSWORD);
    const db = DB_NAME;
    const host = DB_HOST;

    return `${protocol}://${username}:${password}@${host}/${db}?retryWrites=false&w=majority`;
  },
  buildConnectionOptions: (PEM_FILE: string, IS_LOCAL: boolean) => {
    let connectionOptions = {};

    if (!IS_LOCAL) {
      connectionOptions = {
        ssl: true,
        sslValidate: true,
        sslCA: `${__dirname}/${PEM_FILE}`,
      };
    }

    return connectionOptions as ConnectOptions;
  },
};
