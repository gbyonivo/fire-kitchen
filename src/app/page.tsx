import { SearchContainer } from "@/components/search-container";

export default function Home() {
  return (
    <div className="p-4 lg:p-8">
      <main className="w-full">
        <SearchContainer />
      </main>
      <footer></footer>
    </div>
  );
}
