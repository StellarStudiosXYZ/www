import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">Hello World</h1>
      <p>
        You can open{' '}
        <Link href="/docs" className="font-medium underline">
          /docs
        </Link>{' '}
        and see the documentation.
      </p>
      <p>
        You can open{' '}
        <Link href="/blog" className="font-medium underline">
          /blog
        </Link>{' '}
        and see the blog.
      </p>
      <p>
        You can open{' '}
        <Link href="/guide" className="font-medium underline">
          /guide
        </Link>{' '}
        and see the guide.
      </p>
      <p>
        You can open{' '}
        <Link href="/products" className="font-medium underline">
          /products
        </Link>{' '}
        and see our products.
      </p>
    </div>
  );
}
