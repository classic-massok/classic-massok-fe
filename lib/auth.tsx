import React, { useState, useContext, createContext } from 'react'
import cookie from 'cookie'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client'
import Router from 'next/router'

const authContext = createContext(null)

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)

  const isSignedIn = () => {
    if (accessToken) {
      return true
    }

    return false
  }

  const getAuthHeaders = () => {
    if (!accessToken) return null

    return {
      authorization: `Bearer ${accessToken}`,
    }
  }

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
      headers: getAuthHeaders(),
    })

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    })
  }

  const signOut = async () => {
      await fetch(`http://localhost:3000/api/logout`, {
        method: 'POST',
      })

      setAccessToken(null)
      Router.reload()
    }

  return {
    setAccessToken,
    isSignedIn,
    signOut,
    createApolloClient,
  }
}