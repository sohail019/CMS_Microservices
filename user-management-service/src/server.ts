import app from "./app";
import { PORT } from "./config";

app.listen(PORT, () => {
  console.log(`User management service running on port ${PORT}`);
});
