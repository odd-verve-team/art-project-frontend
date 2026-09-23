import { useOutletContext } from "react-router-dom";

import type { UserDetail } from "@/types/user";

export const ProfileFavorites = () => {
  const { user } = useOutletContext<{ user: UserDetail | null }>();

  return (
    <section className="">
      <h1>Favorites Page</h1>
    </section>
  );
};