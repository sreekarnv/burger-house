import { useRouter } from 'next/router';
import { LinkProps } from 'next/link';

const useActiveLink = (href: LinkProps['href'], exact = false) => {
  const router = useRouter();

  const isActive = exact
    ? router.pathname === href.toString()
    : router.pathname.startsWith(href.toString());

  return { isActive };
};

export default useActiveLink;
