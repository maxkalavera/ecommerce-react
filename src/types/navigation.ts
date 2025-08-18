

export interface NavigationItem {
  key: string,
  label: React.ReactNode, 
  href: string
  disabled?: boolean,
  icon?: React.ReactNode;
};

export interface OptionItem {
  key: string,
  label: React.ReactNode,
}