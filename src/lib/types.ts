export interface Link {
  name: string;
  link: string;
  selected: (pathname: string) => boolean;
  children?: Link[];
}
