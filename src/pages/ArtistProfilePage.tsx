import ArtistPortrait from "@/components/features/ArtistProfile/ArtistPortrait";
import type { ArtistDetail } from "@/types/artist";
import type { Artwork } from "@/types/artwork";

export interface ArtistPageData extends Omit<ArtistDetail, "artworks"> {
  email?: string;
  created_at?: string;
  art_categories?: string[];
  artworks: Artwork[];
}

const MOCK_ARTIST: ArtistPageData = {
  id: 1,
  username: "Toy Failor",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=80",
  country: "Athens, Greece",
  email: "studio@toyfailor.com",
  created_at: "2024-03-15T10:00:00Z",
  bio: "Toy Failor is a contemporary artist working across figurative painting and conceptual landscapes. His practice explores the tension between stillness and movement, memory and place, through carefully composed scenes that invite quiet reflection.",
  style:
    "Toy Failor's work sits between contemporary impressionism and figurative landscape. He uses oil on canvas to build layered atmospheres, blending expressive brushwork with subtle narrative elements.",
  artistic_statement:
    "My work is about the quiet moments we often overlook — a shadow on a hill, a figure in the distance, a tree that remembers more than we do. I paint to hold onto those moments.",
  art_categories: [
    "FIGURATIVE",
    "LANDSCAPE",
    "NARRATIVE",
    "CONTEMPORARY IMPRESSIONISM",
  ],
  social_media: {
    instagram: "https://www.instagram.com/nike/",
    twitter: "https://x.com/Nike",
    telegram: "https://t.me/nikeuzb",
    facebook: "https://www.facebook.com/nike/?locale=pl_PL",
  },
  artworks: [],
};

export default function ArtistProfilePage() {
  return (
    <div className="bg-main text-primary border-primary mx-auto max-w-[1440px] border-t px-[8px] md:px-[24px] lg:border-b lg:px-[32px]">
      <div className="lg:border-primary flex flex-col lg:grid lg:grid-cols-[2fr_1fr] lg:items-start lg:border-x lg:border-b">
        <div className="order-1 lg:col-start-1 lg:row-start-1 lg:self-stretch">
          <ArtistPortrait artist={MOCK_ARTIST} />
        </div>
      </div>
    </div>
  );
}
