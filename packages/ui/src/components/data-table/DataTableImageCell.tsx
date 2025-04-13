interface DataTableImageCellProps {
    url: string;
    alt: string;
}

export function DataTableImageCell({ url, alt }: DataTableImageCellProps) {
    return (
        <img
            alt={alt}
            className="aspect-square rounded-md object-cover"
            height={64}
            src={url}
            width={64}
        />
    );
}
