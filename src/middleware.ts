import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(20, '10 s'),
});

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
): Promise<Response | undefined> {
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next();
  }

  const ip = request.ip ?? '127.0.0.1';

  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    `mw_${ip}`
  );
  event.waitUntil(pending);

  const res = success
    ? NextResponse.next()
    : NextResponse.rewrite(new URL('/api/limit/blocked', request.url), request);

  res.headers.set('X-RateLimit-Limit', limit.toString());
  res.headers.set('X-RateLimit-Remaining', remaining.toString());
  res.headers.set('X-RateLimit-Reset', reset.toString());
  return res;
}

export const config = {
  matcher: '/api/trpc/:path*',
};
