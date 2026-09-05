import { useArtworkStore } from "@/store/useArtworkStore";
import { useEffect } from "react"
import { ArtworkGrid } from "./ArtworkGrid";
import { Link } from "react-router-dom";

export const FeaturedArtworks = () => {
  const artworks = useArtworkStore((state) => state.artworks);
  const fetchArtworks = useArtworkStore((state) => state.fetchArtworks);
  // const isLoading = useArtworkStore((state) => state.isLoading);

  useEffect(() => {
    fetchArtworks({ is_featured: true })
  }, [fetchArtworks]);

  return (
    <section className="mt-[100px]">
      <div className="p-[32px] border-[1px] border-primary">
        <ArtworkGrid artworks={artworks} />
      </div>
      <div className="my-[50px] flex justify-center">
        <Link
          to="/gallery"
          className={`
            border-[1px] border-primary px-[44px] py-[22px]
            text-[24px] font-[300] uppercase
            hover:bg-primary hover:text-background transition-colors duration-500 ease-in-out
          `}
        >
          go to gallery
        </Link>
      </div>
    </section>
  );
}