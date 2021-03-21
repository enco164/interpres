import fs = require("fs");
import { configService } from "../src/config/global-config.service";

fs.writeFileSync(
  "./ormconfig.json",
  JSON.stringify(configService.getTypeOrmConfig(), null, 2)
);
