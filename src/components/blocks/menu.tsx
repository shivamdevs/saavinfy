import React from "react";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideElement } from "../lucide/.lucide";

export type BlockMenuContent =
    | {
          name: string;
          onClick?: () => void;
          disabled?: boolean;
          icon?: LucideElement;
          sub?: BlockMenuContent[];
      }
    | boolean;

export type BlockMenuProps = React.PropsWithChildren<{
    dropdown?: boolean;
    items: BlockMenuContent[];
}>;

export default function BlockMenu({
    dropdown,
    children,
    items,
}: BlockMenuProps) {
    const Wrapper = dropdown ? DropdownMenu : ContextMenu;
    const Trigger = dropdown ? DropdownMenuTrigger : ContextMenuTrigger;
    const Content = dropdown ? DropdownMenuContent : ContextMenuContent;

    return (
        <Wrapper>
            <Trigger asChild>{children}</Trigger>
            <Content>
                {items.map((item, index) => (
                    <BlockMenuItem key={index} item={item} d={!!dropdown} />
                ))}
            </Content>
        </Wrapper>
    );
}

function BlockMenuItem({ item, d }: { item: BlockMenuContent; d: boolean }) {
    const Item = d ? DropdownMenuItem : ContextMenuItem;
    const Separator = d ? DropdownMenuSeparator : ContextMenuSeparator;
    const Sub = d ? DropdownMenuSub : ContextMenuSub;
    const SubContent = d ? DropdownMenuSubContent : ContextMenuSubContent;
    const SubTrigger = d ? DropdownMenuSubTrigger : ContextMenuSubTrigger;

    if (!item) {
        return null;
    }

    if (item === true) {
        return <Separator />;
    }

    if (item.sub && item.sub.length > 0) {
        return (
            <Sub>
                <SubTrigger>
                    <span className="w-6 inline-block">
                        {item.icon && <item.icon size={14} />}
                    </span>
                    {item.name}
                </SubTrigger>
                <SubContent>
                    {item.sub.map((subItem, index) => (
                        <BlockMenuItem key={index} item={subItem} d={d} />
                    ))}
                </SubContent>
            </Sub>
        );
    }

    return (
        <Item onSelect={item.onClick}>
            <span className="w-6 inline-block">
                {item.icon && <item.icon size={14} />}
            </span>
            {item.name}
        </Item>
    );
}
