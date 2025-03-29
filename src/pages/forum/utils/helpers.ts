
export const getCategoryColor = (category: string): string => {
  switch (category) {
    case "technology":
      return "bg-blue-100 text-blue-800";
    case "reporting":
      return "bg-green-100 text-green-800";
    case "research":
      return "bg-purple-100 text-purple-800";
    case "guides":
      return "bg-amber-100 text-amber-800";
    case "stories":
      return "bg-pink-100 text-pink-800";
    case "legal":
      return "bg-gray-100 text-gray-800";
    case "tools":
      return "bg-indigo-100 text-indigo-800";
    case "discussion":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
