import { LinkProps as NextLinkProps } from "next/link";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
	NextLinkProps & {
		children?: React.ReactNode;
	};
