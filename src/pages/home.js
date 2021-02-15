import Layout from '../components/Layout/Layout';
import Link from 'next/link';
const Home = () => {
    return (
        <Layout>
            <Link href="/">Root</Link>
        </Layout>
    );
};
Home.getInitialProps = async (ctx) => {
    return {};
};
export default Home;
