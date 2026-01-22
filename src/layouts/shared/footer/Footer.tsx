import Link from 'next/link';
import React from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import IconButton from '../../../components/shared/icon-button';
import classes from './footer.module.scss';

const Footer: React.FC = () => {
  return (
    <>
      <footer className={classes.root}>
        <p className={classes.text}>
          Built with{' '}
          <Link
            target="_blank"
            href="https://nextjs.org"
            className={classes.link}
          >
            Next.js
          </Link>
          , and{' '}
          <Link
            target="_blank"
            href="https://trpc.io/"
            className={classes.link}
          >
            tRPC
          </Link>
          .{' '}
          <span className={classes.copyright}>
            Copyright &copy; 2022-{new Date(Date.now()).getFullYear()} by Sreekar
            Venkata Nutulapati
          </span>
        </p>

        <div className={classes.social}>
          <Link
            target="_blank"
            href="https://github.com/sreekarnv/burger-house"
            passHref
          >
            <IconButton aria-label="Github">
              <FiGithub />
            </IconButton>
          </Link>

          <Link
            target="_blank"
            href="https://linkedin.com/in/sreekarnv"
            passHref
          >
            <IconButton aria-label="Linkedin">
              <FiLinkedin />
            </IconButton>
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
