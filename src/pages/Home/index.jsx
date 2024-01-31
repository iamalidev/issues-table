import { useEffect, useState } from "react";
import { Col, Input, Row, Select, Table, Typography } from "antd";
import PaginationCustom from "../../components/pagination";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Search from "antd/es/input/Search";

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Home = () => {
    const { search } = useLocation();

    const { page } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get("page"));

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        // {
        //     title: "Tags",
        //     dataIndex: "tags",
        //     key: "tags",
        // },
        {
            title: "Difficulty",
            dataIndex: "difficultyTitle",
            key: "difficultyTitle",
        },
        {
            title: "Attempts",
            dataIndex: "solved",
            key: "solved",
        },
    ];

    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    async function getData(page) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API}?page=${searchParams.get("page")}`
            );
            const json = await response.json();
            setData(json);
            setLoading(false);
            setTotalPages(json.total);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    console.log(data);

    useEffect(() => {
        getData(1);
    }, [searchParams]);

    const currentPage = data.page ? Number(data.page) : 1;

    return (
        <div className="container">
            <div className="wrapper">
                <div className="wrapper-items">
                    <Row gutter={16}>
                        <Col className="gutter-row" span={3}>
                            <Typography.Title level={3} type="secondary">
                                Filter ()
                            </Typography.Title>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Search
                                className="wrapper-input"
                                placeholder="Search"
                                onSearch={onSearch}
                                allowClear
                            />
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Select
                                className="wrapper-select"
                                allowClear
                                options={[
                                    {
                                        value: "lucy",
                                        label: "Lucy",
                                    },
                                ]}
                            />
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Select
                                className="wrapper-select"
                                allowClear
                                options={[
                                    {
                                        value: "lucy",
                                        label: "Lucy",
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="wrapper-table">
                    <Table
                        columns={columns}
                        dataSource={data.data}
                        loading={loading}
                        // pagination={false}
                    />
                    <PaginationCustom
                        className="wrapper-pagination"
                        limit={11}
                        page={currentPage}
                        total={data.total}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
