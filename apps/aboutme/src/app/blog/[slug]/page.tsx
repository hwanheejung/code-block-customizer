import { parseDate } from "@/lib/utils/date";
import { getAllPosts, getPostBySlug } from "@/lib/utils/file";
import { rehypePrettyCodeOptions } from "@/styles/rehypePrettyCode";
import { USERMETA } from "contents/meta";
import fs from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import CategoryLink from "./_components/CategoryLink";
import Image, { ImageProps } from "@/components/Image";
import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Section from "@/components/Layouts/Section";
import Process from "@/components/Layouts/Process";

const components = {
  Image: (props: ImageProps) => <Image {...props} height={400} />,
  Box: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: HTMLAttributes<HTMLDivElement>["className"];
  }) => <div className={twMerge("box my-5", className)}>{children}</div>,
  Section: Section,
  "Section.Header": Section.Header,
  "Section.Body": Section.Body,
  "Section.Table": Section.Table,
  "Section.Divider": Section.Divider,
  Process: Process,
  "Process.Item": Process.Item,
};

export async function generateStaticParams() {
  const posts = getAllPosts();

  if (!posts || posts.length === 0) {
    return [{ slug: "not-found" }];
  }

  return posts.map((post) => ({
    slug: post.url,
  }));
}

const PostPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { slug } = params;
  const { content, frontmatter } = await getPostBySlug(slug);

  const source = fs.readFileSync(
    path.join(process.cwd(), `contents/blog`, slug) + ".mdx",
    "utf8",
  );

  return (
    <div>
      <div className="border-b border-primary/30 pb-5 pt-20 text-center">
        {frontmatter.categoryId && (
          <CategoryLink currentCatId={frontmatter.categoryId} />
        )}
        <div className="mb-5 text-4xl text-main">{frontmatter.title}</div>
        <div className="font-thin text-primary/60">
          <div>{parseDate(frontmatter.date)}</div>
          <div>by {USERMETA.name}</div>
        </div>
      </div>
      <div className="mdx prose-a:font-normal prose-a:text-primary/60 prose-a:underline hover:prose-a:text-main/60">
        <MDXRemote
          source={source}
          components={components}
          options={{
            parseFrontmatter: true,
            mdxOptions: {
              rehypePlugins: [
                rehypeAutolinkHeadings,
                [rehypePrettyCode, rehypePrettyCodeOptions],
              ],
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>

      {/* TODO: Add footer */}
      <div className="h-80 w-full" />
    </div>
  );
};

export default PostPage;
