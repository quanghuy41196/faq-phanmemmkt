import ListBoxCategory from "./(components)/ListBoxCategory";

const PageDocsPost = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="flex gap-5 min-h-[300px]">
      <ListBoxCategory productId={"8137ed9c-7d58-40ee-bd0f-ba9bcc07a33c"} />

      <div
        className="customer-editor"
        dangerouslySetInnerHTML={{
          __html: "" ?? "Bài viết mới",
        }}
      />
    </div>
  );
};

export default PageDocsPost;
