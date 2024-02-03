import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input, Select, Table, Tag } from "antd";
import Title from "antd/es/typography/Title";
import PaginationCustom from "../../components/pagination";
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

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    async function getData(page) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API}?page=${
                    searchParams.get("page") || 1
                }&page_size=${
                    searchParams.get("page_size") || 10
                }&hasChecker=${searchParams.get(
                    "hasChecker"
                )}&hasSolution=${searchParams.get("hasSolution")}`
            );
            const json = await response.json();
            setData(json);
            setLoading(false);
            setTotalPages(json.total);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function titleChange(value) {
        const response = await fetch(
            `${import.meta.env.VITE_API}?title=${value}`
        );
        const json = await response.json();
        setData(json);
    }

    function handleChange(hasChecker, queryName) {
        if (hasChecker !== null) {
            searchParams.set(queryName, hasChecker);
            setSearchParams(searchParams);
        } else {
            searchParams.delete(queryName);
            setSearchParams(searchParams);
        }
    }

    function clear(keyword) {
        searchParams.delete(keyword);
        setSearchParams(searchParams);
    }

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => {
                return a.id - b.id;
            },
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (title) => (
                <div>
                    <Title level={5}>{title}</Title>
                </div>
            ),
            onFilter: (value, record) =>
                String(record.title)
                    .toLowerCase()
                    .includes(value.toLowerCase()),
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
            render: (difficultyTitle) => (
                <Tag color={difficultyColors[difficultyTitle.toLowerCase()]}>
                    {difficultyTitle}
                </Tag>
            ),
        },
        {
            title: "Rating",
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

    useEffect(() => {
        getData(1);
    }, [searchParams]);

    const currentPage = data?.page ? Number(data.page) : 1;

    return (
        <div className="container">
            <div className="wrapper">
                <div className="wrapper-items">
                    <Input.Search
                        className="wrapper-input"
                        placeholder="Search by Title"
                        allowClear
                        onSearch={(value) => titleChange(value)}
                        onChange={(e) => titleChange(e.target.value)}
                    />
                    <Select
                        placeholder="Select checker"
                        className="wrapper-select"
                        allowClear
                        onClear={() => clear("hasChecker")}
                        defaultValue={searchParams.get("hasChecker")}
                        options={[
                            {
                                value: "true",
                                label: "Yes",
                            },
                            {
                                value: "false",
                                label: "No",
                            },
                        ]}
                        onChange={(value) => handleChange(value, "hasChecker")}
                    />
                    <Select
                        placeholder="Select solution"
                        className="wrapper-select"
                        defaultValue={searchParams.get("hasSolution")}
                        allowClear
                        options={[
                            {
                                value: "true",
                                label: "Yes",
                            },
                            {
                                value: "false",
                                label: "No",
                            },
                        ]}
                        onChange={(value) => handleChange(value, "hasSolution")}
                    />
                </div>
                <div className="wrapper-table">
                    <Table
                        columns={columns}
                        dataSource={data?.data}
                        loading={loading}
                        pagination={false}
                    />
                </div>
                <div className="wrapper-pagination">
                    <PaginationCustom
                        className="wrapper-pagination"
                        limit={searchParams.get("page_size") || 10}
                        page={currentPage}
                        total={data?.total}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
