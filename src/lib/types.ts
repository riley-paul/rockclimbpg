export type LinkInfo = {
  url: string;
  label: string;
  isActive: (pathname: string) => boolean;
  children?: LinkInfo[];
};
