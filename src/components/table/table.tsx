import { cn } from "../../utils/cn";

// Type definitions
type TableProps = React.ComponentPropsWithRef<"table">;

type TableHeaderProps = React.ComponentPropsWithRef<"thead">;

type TableBodyProps = React.ComponentPropsWithRef<"tbody">;

type TableFooterProps = React.ComponentPropsWithRef<"tfoot">;

type TableRowProps = React.ComponentPropsWithRef<"tr"> & {
  "data-state"?: "selected";
};

type TableHeadProps = React.ComponentPropsWithRef<"th">;

type TableCellProps = React.ComponentPropsWithRef<"td">;

type TableCaptionProps = React.ComponentPropsWithRef<"caption">;

const Table = ({ className, ...props }: TableProps) => (
  <div className="relative w-full overflow-auto">
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
);
Table.displayName = "Table";

const TableHeader = ({ className, ...props }: TableHeaderProps) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
);
TableHeader.displayName = "TableHeader";

const TableBody = ({ className, ...props }: TableBodyProps) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);
TableBody.displayName = "TableBody";

const TableFooter = ({ className, ...props }: TableFooterProps) => (
  <tfoot
    className={cn(
      "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
);
TableFooter.displayName = "TableFooter";

const TableRow = ({ className, ...props }: TableRowProps) => (
  <tr
    className={cn(
      "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
      className,
    )}
    {...props}
  />
);
TableRow.displayName = "TableRow";

const TableHead = ({ className, ref, ...props }: TableHeadProps) => (
  <th
    ref={ref}
    className={cn(
      "text-muted-foreground text-left align-middle font-medium [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
);
TableHead.displayName = "TableHead";

const TableCell = ({ className, ...props }: TableCellProps) => (
  <td
    className={cn("align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
);
TableCell.displayName = "TableCell";

const TableCaption = ({ className, ...props }: TableCaptionProps) => (
  <caption
    className={cn("text-muted-foreground mt-4 text-sm", className)}
    {...props}
  />
);
TableCaption.displayName = "TableCaption";

export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
};

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
