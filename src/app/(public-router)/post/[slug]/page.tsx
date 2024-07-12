import { getFetchOnePost } from "@/services/fetch";
import { notFound } from "next/navigation";
import { use } from "react";
import ListBoxCategory from "./(components)/ListBoxCategory";

interface IParamsCategoryPost {
  params: { slug: string };
}

export async function generateMetadata({ params }: IParamsCategoryPost) {
  const dataOnePost = await getFetchOnePost({
    search: {
      slug: params?.slug,
    },
  });

  return {
    title: dataOnePost?.title ?? "Không tìm thấy trang",
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
