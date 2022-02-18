import MDXRenderer from '../components/MDXRenderer';
import Link from 'next/link';

const mdx = `
# hello there!

*niiiice*
`;

export default function Hello() {
  return (
    <>
      <p>my content:</p>
      <hr />
      <MDXRenderer mdx={mdx} />
      <Link href="/goodbye">
        <a>bye</a>
      </Link>
    </>
  );
}
