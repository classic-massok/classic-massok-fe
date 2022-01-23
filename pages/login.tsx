import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Form from '../components/form'
import { useAuth } from '../lib/auth'
import { LoginMutationVariables, useLoginMutation } from '../lib/mutations/login.generated'
import { GetServerSideProps } from 'next'
import cookie from 'cookie'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx
  if (!req.headers.cookie) {
    console
    return { props: { } }
  }

  const { accessToken } = cookie.parse(req.headers.cookie)
  return { props: { accessToken } }
}


function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [accessToken, setAccessToken] = useState(null)
  // const [refreshToken, setRefreshToken] = useState(null)
  const variables: LoginMutationVariables = {
    input: {
      email,
      password,
    }
  }

  const [loginMutation,  { error }] = useLoginMutation({ variables })

  const onSubmit = async (e: React.FormEvent<typeof Form>) => {
    e.preventDefault()
    await loginMutation()
    // .then(result => {
    //   if (result?.data?.login) {
    //     setAccessToken(result.data.login.accessToken)
    //     setRefreshToken(result.data.login.refreshToken)
    //   }
    // })

    router.reload()
  }

  return (
    <div>
      <Form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Sign In</button>
      </Form>
    </div>
  )
}

const TestSignedInPage = () => {
  const { signOut } = useAuth()

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
        <button onClick={() => signOut()}>
          Sign Out
        </button>
        <div>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default function Login({ accessToken }) {
  return (
    <div className="container">
      <main className="main">
        {!accessToken && <SignInPage />}
        {accessToken && <TestSignedInPage />}
      </main>
    </div>
  )
}
