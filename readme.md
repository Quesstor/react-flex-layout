# React-flex-layout
## Usage
This package is written in typescript.

The Layout consists of only two elements `<Container>` and `<Item>`, where the `<Container>` is an `<Item>` aswell.

For more info about Flexbox in general see https://css-tricks.com/snippets/css/a-guide-to-flexbox/.

### Container
`<Container>` takes two props: `layout` and `wrap`, eg 
```tsx
<Container layout={"row between center"}>...
```
where the layout string consist of three words: 
- The first describing the flex-direction: `row` or `column`.
- The second describing justify-content, where `start` and `end` will be interpreted as `flex-start` and `flex-end`
- The third describing align-items, where `start` and `end` will be interpreted as `flex-start` and `flex-end`

For responsive applications the layout can be changed depending on the screen resolution, e.g.
```tsx
<Container layout={{ xs: "row between center", md: "column around baseline", lg: "row between start", xl: "row end center" }} >...
```
where each size breakpoint counts for all screen sizes equal or greater itself, e.g. `md` option counts for `md` screens and above.
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
`<Item>` takes one property: `flex`, e.g. 
```tsx
<Item flex={6}>...
```
where the number indicates how many 1/12th width of the container should be taken, e.g. `6` means take half the width.
Again for responsive applications these can be overriden, e.g.
```tsx
<Item flex={{xs: 6, sm: 5, md: 4, lg: 3, xl: 2}}>...
```
If the order needs to changed aswell, one can use:
```tsx
<Item flex={{xs: {order: 4, size: 6}, sm: 5, md: 4, lg: 3, xl: 2}}></Item>
```
