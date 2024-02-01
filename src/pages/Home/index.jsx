import { useEffect, useState } from "react";
import { Col, Row, Select, Table, Tag, Typography } from "antd";
import PaginationCustom from "../../components/pagination";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";
import LikeIcon from "../../assets/icons/like";
import SolvedIcon from "../../assets/icons/solved";
import NotSolvedIcon from "../../assets/icons/notSolved";

const difficultyColors = {
    beginner: "green",
    basic: "lime",
    normal: "gold",
    medium: "cyan",
    advanced: "volcano",
    hard: "red",
    extremal: "purple",
};

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
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            sorter: (a, b) => a.title - b.title,
            render: (title) => (
                <div>
                    <Title level={5}>{title}</Title>
                </div>
            ),
        },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (tags) => (
                <>
                    {tags.map((tag) => (
                        <Tag key={tag.id} color="#1677FF">
                            {tag.name}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: "Difficulty",
            dataIndex: "difficultyTitle",
            key: "difficultyTitle",
            sorter: (a, b) => a.difficultyTitle - b.difficultyTitle,
            render: (difficultyTitle) => (
                <Tag color={difficultyColors[difficultyTitle.toLowerCase()]}>
                    {difficultyTitle}
                </Tag>
            ),
        },
        {
            title: "Rating",
            sorter: (a, b) => a.likesCount - b.likesCount,
            render: (rate) => (
                <span className="rate">
                    <span>
                        <LikeIcon /> {rate.likesCount}
                    </span>
                    <span>
                        <LikeIcon style={{ transform: "rotate(-180deg)" }} />
                        {rate.dislikesCount}
                    </span>
                </span>
            ),
        },
        {
            title: "Attempts",
            sorter: (a, b) => a.solved - b.solved,
            render: (attempt) => (
                <span className="rate">
                    <span style={{ color: "#39CC7A" }}>
                        {attempt.solved} <SolvedIcon />
                    </span>
                    <span style={{ color: "#EB5B5C" }}>
                        {attempt.notSolved}
                        <NotSolvedIcon />
                    </span>
                </span>
            ),
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
                        <Col className="gutter-row" span={6}>
                            <Typography.Title level={3} type="secondary">
                                Filter()
                            </Typography.Title>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Search
                                className="wrapper-input"
                                placeholder="Search by Title"
                                onSearch={onSearch}
                                allowClear
                            />
                        </Col>
                        <Col className="gutter-row" span={6}>
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
                        <Col className="gutter-row" span={6}>
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
                        limit={10}
                        page={currentPage}
                        total={data.total}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
