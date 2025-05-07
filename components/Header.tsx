import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive = (pathname: string) => router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/" legacyBehavior>
        <a className="bold" data-active={isActive('/')}>Feed</a>
      </Link>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive('/')}>Feed</a>
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session && status !== 'loading') {
    right = (
      <div className="right">
        <Link href="/api/auth/signin" legacyBehavior>
          <a data-active={isActive('/signup')}>Log in</a>
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive('/')}>Feed</a>
        </Link>
        <Link href="/drafts" legacyBehavior>
          <a data-active={isActive('/drafts')}>My drafts</a>
        </Link>
      </div>
    );
    right = (
      <div className="right">
        <p>{session.user.name} ({session.user.email})</p>
        <Link href="/create" legacyBehavior>
          <a className="button">New post</a>
        </Link>
        <button onClick={() => signOut()}>Log out</button>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
          justify-content: space-between;
        }

        .bold {
          font-weight: bold;
        }

        .left a,
        .right a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
        }

        .left a[data-active='true'] {
          color: gray;
        }

        .left a + a,
        .right a + a {
          margin-left: 1rem;
        }

        .right {
          margin-left: auto;
        }

        .right a {
          border: 1px solid var(--geist-foreground);
          padding: 0.5rem 1rem;
          border-radius: 3px;
        }

        p {
          display: inline-block;
          font-size: 13px;
          padding-right: 1rem;
        }

        button {
          border: none;
          background: none;
          cursor: pointer;
          padding: 0.5rem 1rem;
        }
      `}</style>
    </nav>
  );
};

export default Header;
