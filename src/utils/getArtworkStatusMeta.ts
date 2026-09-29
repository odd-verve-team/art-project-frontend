export const getArtworkStatusMeta = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return { bg: 'bg-[#000000]/15', label: 'MODERATION', icon: '◷' };
    case 'rejected':
      return { bg: 'bg-[#FF0000]/15', label: 'REJECTED', icon: '✕' };
    case 'sold':
      return { bg: 'bg-[#22c55e]/15', label: 'SOLD', icon: '●' };
    case 'approved':
    default:
      return { bg: 'bg-transparent', label: 'APPROVED', icon: '✓' };
  }
};