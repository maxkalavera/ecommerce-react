import document from "@/layouts/document";
import MainLayout from "@/layouts/main";


export default async function Base() {
  return (
    <MainLayout>
      <document.Section>
        <document.SectionTitle></document.SectionTitle>
      </document.Section>
      <document.Section>
        {/* Content */}
      </document.Section>
    </MainLayout>
  );
};
