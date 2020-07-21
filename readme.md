# React-flex-layout
## Usage
This package is written in typescript.

The Layout consists of only two functions `Container` and `Flex`, which generate classNames for your html elements.

For more info about Flexbox in general see https://css-tricks.com/snippets/css/a-guide-to-flexbox/.

### Container
`Container` takes two arguments: `layout` and optional `wrap`, e.g.
```tsx
  <div className={Container("column start stretch")}> ...
  or
  <div className={Container("row between center", "nowrap")}> ...
```
where the layout string consist of three words: 
- The first describing the flex-direction: `row` or `column`.
- The second describing justify-content, the layout along the main axes, where `start` and `end` will be interpreted as `flex-start` and `flex-end`.
- The third describing align-items, where `start` and `end` will be interpreted as `flex-start` and `flex-end`.

For responsive applications the layout can be changed depending on the screen resolution, e.g.
```tsx
<div className={Container({xs: "column start stretch", md:"row around center", lg: "row between start", xl: "row end center"})}> ...
or
<div className={Container({xs: "column start stretch", lg: "row between start"})}> ...
```
where each size breakpoint is optional and counts for all screen sizes equal or greater itself, e.g. `md` option counts for `md` screens and above.
The breakpoints are equivalent to bootstraps breakpoints:
```css
// xs: Extra small devices (portrait phones, less than 576px)

// sm: Small devices (landscape phones, 576px and up)
@media (min-width: 576px) { ... }

// md: Medium devices (tablets, 768px and up)
@media (min-width: 768px) { ... }

// lg: Large devices (desktops, 992px and up)
@media (min-width: 992px) { ... }

// xl: Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) { ... }
```

### Item

`Flex` takes one parameter which can either describe the `flex-grow` property with `flex` or a fixed width with `size`.

#### Flex Grow
If you want the Item to compete over the remaining space in the container you can give it a `flex-grow` (see https://css-tricks.com/snippets/css/a-guide-to-flexbox/) property with
```tsx
<div className={Flex({ flex: "1" })}>...</div>
```
Possible values are `"1"` to `"12"`.

#### Fixed Width
or a fixed width with `size`, where a `i` means `i/12`th of the Container, like the bootstrap grid system e.g.
```tsx
<div className={Flex({ size: "6" })}>...</div>
```
would take half the width of the parent container.
Possible values are `"1"` to `"12"`.

#### Responsive
Again for responsive applications these can be overriden, e.g.
```tsx
<div className={Flex({xs: { flex: "1" }, sm: { size: "6" }, md: { size: "4" }, lg: { size: "3" }, xl: { size: "1" }})}>...</div>
```

#### Order

If the order needs to changed aswell, one can use:
```tsx
<div className={Flex({ xs: { order: "4", size: "6" }, sm: { flex: "5" } })}>...</div>
```
