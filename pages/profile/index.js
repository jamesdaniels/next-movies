import Head from "next/head";
import { api } from "services/datastore";
import MovieList from "components/MovieList";
import PaddingWrapper from "parts/PaddingWrapper";
import Header from "parts/Header";
import { getAuth } from "firebase/auth";
import PageWrapper from "parts/PageWrapper";

export const getServerSideProps = async (context) => {
    const { firebaseApp } = context.req;
    const { currentUser } = getAuth(firebaseApp);
    if (currentUser) {
        const favorites = await api.get(`/users/${currentUser.id}/favorites`);
        return { props: { currentUser, favorites } };
    } else {
        return { notFound: true };
    }
};

const Profile = ({ currentUser, favorites }) => {
    return <PageWrapper>
        <PaddingWrapper>
            <Head>
                <title>{`Your favorites`}</title>
            </Head>
            <Header
              title={`Welcome back, ${ currentUser.displayName }`}
              subtitle='Your favorite floofs await' />
            <MovieList
                baseUrl={'/'}
                movies={favorites} />
        </PaddingWrapper>
    </PageWrapper>
}

export default Profile;