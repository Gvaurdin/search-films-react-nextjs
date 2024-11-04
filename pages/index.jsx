
import Head from 'next/head';
import BackgroundSlider from '@/services/backgroundService';
import MovieSearchApp from '@/components/MovieApp';
const HomePage = () => {
    return <>
        <div>
            <Head>
                <title>Movie Search</title>
                <meta name="description" content="Search for your favorite movies" />
            </Head>
            <main>
                <BackgroundSlider />
                <MovieSearchApp />
            </main>
        </div>
    </>
};

export default HomePage;
