import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>Strapi - Next - NextAuth {process.env.NEXTAUTH_SECRET}</title>
      </Head>
      <h1>{session ? 'Authenticated' : 'Not Authenticated'}</h1>
      {session && (
        <div style={{ marginBottom: 10 }}>
          <h3>Session Data</h3>
          <div>Email: {session.user.email}</div>
          <div>JWT from Strapi: Check console</div>
        </div>
      )}
      {session ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <Link href="/auth/login">
          <button>Sign In</button>
        </Link>
      )}
      <Link href="/protected">
        <button
          style={{
            marginTop: 10,
          }}
        >
          Protected Page
        </button>
      </Link>
    </div>
  );
}

Dashboard.auth = true;
