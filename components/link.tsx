import NextLink from "next/link";

export default function Link({
  href,
  className,
  children
}: {
  href: string,
  className?: string,
  children: React.ReactNode
}) {
  return (
    <NextLink href={href} passHref>
      <a className={className}>{ children }</a>
    </NextLink>
  );
}