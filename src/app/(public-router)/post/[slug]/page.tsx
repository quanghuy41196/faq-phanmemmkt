import { getFetchOnePost } from "@/services/fetch";
import { notFound } from "next/navigation";
import { use } from "react";
import ListBoxCategory from "./(components)/ListBoxCategory";
import { Metadata } from "next";

interface IParamsCategoryPost {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: IParamsCategoryPost): Promise<Metadata> {
  const dataOnePost = await getFetchOnePost({
    search: {
      slug: params?.slug,
    },
  });

  return {
    title: dataOnePost?.title ?? "Không tìm thấy trang",
    openGraph: {
      type: "article",
      title: dataOnePost?.title ?? "Không tìm thấy trang",
    },
    twitter: {
      title: dataOnePost?.title ?? "Không tìm thấy trang",
    }
  };
}

const PageDocsPost = ({ params }: IParamsCategoryPost) => {
  const dataOnePost = use(
    getFetchOnePost({
      search: {
        slug: params?.slug,
      },
    })
  );

  if (!dataOnePost?.id) {
    notFound();
  }

  return (
    <div className="flex gap-5 min-h-[300px]">
      <ListBoxCategory currentCategory={dataOnePost?.category} />

      <div
        className="customer-editor"
        dangerouslySetInnerHTML={{
          __html: dataOnePost?.content?.content ?? "",
        }}
      />
    </div>
  );
};

export default PageDocsPost;
