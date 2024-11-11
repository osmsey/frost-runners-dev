import Head from 'next/head';

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
// import Map from '@components/Map';
import Button from '@components/Button';

import styles from '@styles/Home.module.scss';
import useGeoLocation from 'src/hooks/useGeolocation';

const DEFAULT_CENTER = [38.907132, -77.036546]
// [51.505, -0.09]

export default function Runner() {
    const location = useGeoLocation()
  return (
    <Layout>
      <Head>
        <title>Frost tracker</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          <h1 className={styles.title}>
            Frost tracker
          </h1>

       

          <p className={styles.description}>
            Your location:
            {location.loaded
                                    ? JSON.stringify(location)
                                    : "Location data not available yet."}
          </p>

          <p className={styles.view}>
            <Button >Start tracking</Button>
          </p>
        </Container>
      </Section>
    </Layout>
  )
}
