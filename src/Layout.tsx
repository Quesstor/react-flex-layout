import React from 'react';
import "./Container.css"
import "./Item.css"

type ZeroToTwelve = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface FlexOption {
    order?: ZeroToTwelve,
    size: ZeroToTwelve,
}
function isFlexOption(x: any): x is FlexOption {
    return 'size' in x;
}

interface ItemProps {
    flex?: {
        xs?: FlexOption | ZeroToTwelve,
        sm?: FlexOption | ZeroToTwelve,
        md?: FlexOption | ZeroToTwelve,
        lg?: FlexOption | ZeroToTwelve,
        xl?: FlexOption | ZeroToTwelve,
    } | ZeroToTwelve | FlexOption,
    style?: React.CSSProperties,
    className?: string,
    id?: string
}

function getItemClasses(size: "xs" | "sm" | "md" | "lg" | "xl", flex: FlexOption | ZeroToTwelve | undefined): string {
    if (flex === undefined) return "";
    var classes: string[] = [];
    if (typeof flex === "number") {
        classes.push(`layout-size-${size}-${flex}`);
    } else {
        classes.push(`layout-size-${size}-${flex.size}`);
        if (flex.order !== undefined) classes.push(`layout-order-${size}-${flex.order} `);
    }
    return classes.join(" ");
}
function getAllItemClasses(p: ItemProps): string {
    var classes: string[] = [];

    if (p.flex !== undefined) {
        if (typeof p.flex === "number" || isFlexOption(p.flex)) {
            classes.push(getItemClasses("xs", p.flex));
        } else {
            classes.push(getItemClasses("xs", p.flex.xs));
            classes.push(getItemClasses("sm", p.flex.sm));
            classes.push(getItemClasses("md", p.flex.md));
            classes.push(getItemClasses("lg", p.flex.lg));
            classes.push(getItemClasses("xl", p.flex.xl));
        }
    }
    return `${p.className || ""} ${classes.join(" ")}`
}
export const Item: React.FunctionComponent<ItemProps> = (p) => {
    return <div id={p.id} style={p.style} className={getAllItemClasses(p)}>{p.children}</div>
}

interface ContainerProps extends ItemProps {
    layout: { xs: Layout, sm?: Layout, md?: Layout, lg?: Layout, xl?: Layout, } | Layout,
    wrap?: boolean,
}


function getContainerClasses(size: "xs" | "sm" | "md" | "lg" | "xl", layout: Layout | undefined): string {
    if (layout === undefined) return "";
    var [direction, justify, align] = layout.toString().split(" ");
    return `layout-flex-${size}-${direction} layout-justify-content-${size}-${justify} layout-align-items-${size}-${align}`;
}

export const Container: React.FunctionComponent<ContainerProps> = (p) => {
    var classes: string[] = ["layout-flex"];
    if (p.wrap === undefined || p.wrap === true) classes.push("flex-wrap");
    if (typeof p.layout === "string") {
        classes.push(getContainerClasses("xs", p.layout));
    } else {
        classes.push(getContainerClasses("xs", p.layout.xs));
        classes.push(getContainerClasses("sm", p.layout.sm));
        classes.push(getContainerClasses("md", p.layout.md));
        classes.push(getContainerClasses("lg", p.layout.lg));
        classes.push(getContainerClasses("xl", p.layout.xl));
    }

    return <div id={p.id} className={`${classes.join(" ")} ${p.className || ''} ${getAllItemClasses(p)}`} style={p.style}>
        {p.children}
    </div>
}

type Layout =
    "row start start" | "row start end" | "row start center" | "row start baseline" | "row start stretch" |
    "row end start" | "row end end" | "row end center" | "row end baseline" | "row end stretch" |
    "row center start" | "row center end" | "row center center" | "row center baseline" | "row center stretch" |
    "row between start" | "row between end" | "row between center" | "row between baseline" | "row between stretch" |
    "row around start" | "row around end" | "row around center" | "row around baseline" | "row around stretch" |
    "column start start" | "column start end" | "column start center" | "column start baseline" | "column start stretch" |
    "column end start" | "column end end" | "column end center" | "column end baseline" | "column end stretch" |
    "column center start" | "column center end" | "column center center" | "column center baseline" | "column center stretch" |
    "column between start" | "column between end" | "column between center" | "column between baseline" | "column between stretch" |
    "column around start" | "column around end" | "column around center" | "column around baseline" | "column around stretch";

