import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'src/theme';
import { ApolloProvider } from '@apollo/react-hooks';
import { useApollo } from 'src/lib/apolloClient';
import { AuthenticationProvider } from 'src/Context/Authentication';

export default function MyApp(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;

  const apolloClient = useApollo(pageProps.initialApolloState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <AuthenticationProvider>
          <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              <CssBaseline />
              <Component {...pageProps} />
            </StylesProvider>
          </ThemeProvider>
        </AuthenticationProvider>
      </ApolloProvider>
    </>
  );
}
