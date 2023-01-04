import { createNextApiHandler } from '@trpc/server/adapters/next';
import { createContext } from '../../../server/trpc/context';
import { appRouter } from '../../../server/trpc/router/_app';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
});
