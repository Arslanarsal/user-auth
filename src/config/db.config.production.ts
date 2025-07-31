import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as path from "path"

export default (): PostgresConnectionOptions => ({
    url: process.env.url,
    host: process.env.host,
    port: +process.env.port!,
    database: "postgres",
    type: "postgres",
    entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
    synchronize: false
});