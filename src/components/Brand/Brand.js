import Link from 'next/link';
const Brand = () => (
    <Link href="/">
        <a className="d-block d-sm-none">
            <img src="/img/artbot-logo.png" className="brand" />
        </a>
    </Link>
);

export default Brand;
