export const DescautelarIcon = ({
    height = "1em",
    fill = "currentColor",
    focusable = "false",
    ...props
  }: Omit<React.SVGProps<SVGSVGElement>, "children">) => (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={height}
      focusable={focusable}
      {...props}
    >
      <g fill={fill}>
        <path d="M20 5H8v4H6V3h16v18H6v-6h2v4h12z" />
        <path d="m13.074 16.95l-1.414-1.414L14.196 13H2v-2h12.196L11.66 8.465l1.414-1.415l4.95 4.95z" />
      </g>
    </svg>
  );