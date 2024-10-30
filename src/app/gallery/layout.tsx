import { IndexedDBProvider } from "@/fsd/shared";
import { Header } from "@/fsd/widgets/Header/ui/Header";

export default function GalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <IndexedDBProvider>{children}</IndexedDBProvider>
    </div>
  );
}
