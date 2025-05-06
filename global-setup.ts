
import { isEnvReachable } from './utils/checkEnv';

export default async () => {
  const baseUrl = process.env.BASE_URL!;
  const reachable = await isEnvReachable(baseUrl);

  if (!reachable) {
    console.error(`\n[SKIP] Environment unreachable: ${baseUrl}\n`);
    process.exit(77); // 77 is a common code for "skipped"
  }
};