import { useSearchParams } from "react-router-dom";
import { Pagination } from "antd";

const PaginationCustom = ({ limit, page, total }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (page, pageSize) => {
        if (page != null) {
            searchParams.set("page", page.toString());
            searchParams.set("page_size", pageSize.toString());
            setSearchParams(searchParams);
        } else {
            searchParams.delete("page");
            searchParams.delete("pageSize");
            setSearchParams(searchParams);
        }
    };

    return (
        <div className="pagination-wrap">
            <Pagination
                pageSizeOptions={["10", "20", "50"]}
                onChange={(page, pageSize) => handleChange(page, pageSize)}
                total={total}
                current={page}
                pageSize={limit}
            />
        </div>
    );
};

export default PaginationCustom;
