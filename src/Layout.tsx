import cs from "./Container.module.scss"
import hideClasses from "./Hide.module.scss"
import is from "./Item.module.scss"

export const hide = hideClasses
export const ItemSpacing = {
    margin1: is.margin1,
    margin2: is.margin2,
    margin3: is.margin3,
    margin4: is.margin4,
    margin5: is.margin5,
    margin6: is.margin6,
    margin7: is.margin7,
    margin8: is.margin8,
    margin9: is.margin9,
    margin10: is.margin10,
    margin11: is.margin11,
    margin12: is.margin12,
}

type ZeroToTwelve = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12"
type FlexOption = {
    order?: ZeroToTwelve,
    flex?: ZeroToTwelve,
    size?: ZeroToTwelve,
}
interface FlexOptions {
    xs?: FlexOption,
    sm?: FlexOption,
    md?: FlexOption,
    lg?: FlexOption,
    xl?: FlexOption,
}
function isFlexOption(x: any): x is FlexOption {
    return 'order' in x || "flex" in x || "size" in x
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
    "column around start" | "column around end" | "column around center" | "column around baseline" | "column around stretch"

function getItemClasses(screenSize: "xs" | "sm" | "md" | "lg" | "xl", flex?: FlexOption): string {
    if (flex === undefined) return ""
    var classes: string[] = []
    if (flex.order !== undefined) classes.push(is[`layout_order_${screenSize}_${flex.order}`])
    if (flex.size !== undefined) classes.push(is[`layout-size-${screenSize}-${flex.size}`])
    if (flex.flex !== undefined) classes.push(is[`layout-flex-${screenSize}-${flex.flex}`])
    return classes.join(" ")
}

export const Flex = (p: FlexOptions | FlexOption): string => {
    var classes: string[] = []
    if (isFlexOption(p)) {
        classes.push(getItemClasses("xs", p))
    } else {
        classes.push(getItemClasses("xs", p.xs))
        classes.push(getItemClasses("sm", p.sm))
        classes.push(getItemClasses("md", p.md))
        classes.push(getItemClasses("lg", p.lg))
        classes.push(getItemClasses("xl", p.xl))
    }
    return classes.join(" ")
}

function getContainerClasses(size: "xs" | "sm" | "md" | "lg" | "xl", layout: Layout | undefined): string {
    if (layout === undefined) return ""
    var [direction, justify, align] = layout.toString().split(" ")
    return [
        cs[`layout-flex-${size}-${direction}`],
        cs[`layout-justify-content-${size}-${justify}`],
        cs[`layout-align-items-${size}-${align}`]].join(" ")
}

export const Container = (layout: Layout | { xs: Layout, sm?: Layout, md?: Layout, lg?: Layout, xl?: Layout, }, wrap?: "nowrap" | "wrap" | "wrap-reverse") => {
    var classes: string[] = [cs["layout-flex"]]
    classes.push(cs[`layout-${wrap || "wrap"}`])
    if (typeof layout === "string") {
        classes.push(getContainerClasses("xs", layout))
    } else {
        if (typeof layout === "string") {
            classes.push(getContainerClasses("xs", layout))
        } else {
            classes.push(getContainerClasses("xs", layout.xs))
            classes.push(getContainerClasses("sm", layout.sm))
            classes.push(getContainerClasses("md", layout.md))
            classes.push(getContainerClasses("lg", layout.lg))
            classes.push(getContainerClasses("xl", layout.xl))
        }
    }
    return classes.join(" ")
}

