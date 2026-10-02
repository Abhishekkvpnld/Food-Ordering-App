import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Props = {
  page: number;
  pages: number;
  onPageChange: (pageNum: number) => void;
};

const PaginationSection = ({
  page,
  pages,
  onPageChange,
}: Props) => {
  if (!pages || pages <= 1) {
    return null;
  }

  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <div className="inline-flex bg-white border border-gray-100 rounded-2xl shadow-sm p-1.5">
        <Pagination>
          <PaginationContent className="gap-1">
            {page !== 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    onPageChange(page - 1);
                  }}
                  className="rounded-xl hover:bg-orange-50 hover:text-orange-500"
                />
              </PaginationItem>
            )}

            {pageNumbers.map((num) => (
              <PaginationItem key={num}>
                <PaginationLink
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    onPageChange(num);
                  }}
                  isActive={page === num}
                  className={`
                    rounded-xl
                    font-semibold
                    ${
                      page === num
                        ? "bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
                        : "hover:bg-orange-50 hover:text-orange-500"
                    }
                  `}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            ))}

            {page !== pages && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    onPageChange(page + 1);
                  }}
                  className="rounded-xl hover:bg-orange-50 hover:text-orange-500"
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PaginationSection;
